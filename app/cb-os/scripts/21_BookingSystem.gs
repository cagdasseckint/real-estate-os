/**
 * CB-OS Booking System (Forms + Calendar + Sheets)
 * Handles booking requests, availability checks, confirmations, and alternatives.
 */

const BOOKING_SHEETS = {
  REQUESTS: 'BookingRequests'
};

const BOOKING_HEADERS = [
  'request_id', 'ts', 'name', 'email', 'phone', 'service_type',
  'preferred_date', 'preferred_window_start', 'preferred_window_end',
  'status', 'calendar_event_id', 'suggested_slots_json', 'notes'
];

const BOOKING_DEFAULTS = {
  TIMEZONE: 'Europe/Istanbul',
  WORK_START_HOUR: 10,
  WORK_END_HOUR: 18,
  DURATION_MINUTES: 30,
  SLOT_INTERVAL_MINUTES: 30
};

/**
 * Bootstrap BookingRequests sheet with headers
 */
function bootstrapBookingSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(BOOKING_SHEETS.REQUESTS);
  if (!sheet) {
    sheet = ss.insertSheet(BOOKING_SHEETS.REQUESTS);
    sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]);
    sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setFontWeight('bold');
  }
}

/**
 * Form submit handler for bookings
 */
function bookingOnFormSubmit(e) {
  const payload = normalizeBookingPayload_(e);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOKING_SHEETS.REQUESTS);
  if (!sheet) throw new Error('BookingRequests sheet missing');
  
  const requestId = Utilities.getUuid();
  const now = new Date();
  const row = {
    request_id: requestId,
    ts: now.toISOString(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service_type: payload.service_type,
    preferred_date: payload.preferred_date,
    preferred_window_start: payload.preferred_window_start,
    preferred_window_end: payload.preferred_window_end,
    status: 'pending',
    calendar_event_id: '',
    suggested_slots_json: '',
    notes: payload.notes
  };
  
  sheet.appendRow(BOOKING_HEADERS.map(h => row[h] || ''));
  const rowIndex = sheet.getLastRow();
  
  const availability = checkAvailability_(payload);
  if (availability.available) {
    const event = createBookingEvent_(payload);
    updateBookingRow_(sheet, rowIndex, {
      status: 'confirmed',
      calendar_event_id: event.getId()
    });
    sendConfirmationEmail_(payload, event);
    createFollowupTask_(payload, event);
  } else {
    const suggestions = suggestAlternativeSlots_(payload);
    updateBookingRow_(sheet, rowIndex, {
      status: 'rescheduled',
      suggested_slots_json: JSON.stringify(suggestions)
    });
    sendRescheduleEmail_(payload, suggestions);
  }
}

function normalizeBookingPayload_(e) {
  const named = e && e.namedValues ? e.namedValues : {};
  const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
  
  const preferredDate = getValue('Tercih edilen gün');
  const window = getValue('Tercih edilen saat aralığı');
  const parsedWindow = parseTimeWindow_(preferredDate, window);
  
  return {
    name: getValue('Ad Soyad'),
    email: getValue('Email'),
    phone: normalizePhoneBooking_(getValue('Telefon')),
    service_type: getValue('Hizmet türü'),
    preferred_date: preferredDate,
    preferred_window_start: parsedWindow.start,
    preferred_window_end: parsedWindow.end,
    notes: getValue('Not')
  };
}

function normalizePhoneBooking_(phone) {
  return phone ? phone.replace(/\D/g, '') : '';
}

function parseTimeWindow_(dateStr, windowStr) {
  const tz = BOOKING_DEFAULTS.TIMEZONE;
  const date = new Date(dateStr);
  const parts = windowStr.split('-').map(p => p.trim());
  const start = parts[0] || '10:00';
  const end = parts[1] || '18:00';
  
  const startDate = new Date(date);
  const endDate = new Date(date);
  const startParts = start.split(':');
  const endParts = end.split(':');
  startDate.setHours(Number(startParts[0]), Number(startParts[1]), 0, 0);
  endDate.setHours(Number(endParts[0]), Number(endParts[1]), 0, 0);
  
  return {
    start: Utilities.formatDate(startDate, tz, "yyyy-MM-dd'T'HH:mm:ss"),
    end: Utilities.formatDate(endDate, tz, "yyyy-MM-dd'T'HH:mm:ss")
  };
}

function checkAvailability_(payload) {
  const calendar = CalendarApp.getDefaultCalendar();
  const start = new Date(payload.preferred_window_start);
  const end = new Date(payload.preferred_window_end);
  const events = calendar.getEvents(start, end);
  return { available: events.length === 0 };
}

function createBookingEvent_(payload) {
  const calendar = CalendarApp.getDefaultCalendar();
  const start = new Date(payload.preferred_window_start);
  const end = new Date(start.getTime() + BOOKING_DEFAULTS.DURATION_MINUTES * 60000);
  const title = payload.service_type + ' - ' + payload.name;
  const description = 'Booking request from ' + payload.name + '\n' +
    'Email: ' + payload.email + '\n' +
    'Phone: ' + payload.phone + '\n' +
    'Notes: ' + payload.notes;
  
  return calendar.createEvent(title, start, end, {
    guests: payload.email,
    description: description
  });
}

function suggestAlternativeSlots_(payload) {
  const suggestions = [];
  const calendar = CalendarApp.getDefaultCalendar();
  const start = new Date(payload.preferred_window_start);
  const end = new Date(payload.preferred_window_end);
  const slotMinutes = BOOKING_DEFAULTS.SLOT_INTERVAL_MINUTES;
  const durationMs = BOOKING_DEFAULTS.DURATION_MINUTES * 60000;
  
  let cursor = new Date(start);
  while (cursor.getTime() + durationMs <= end.getTime() && suggestions.length < 3) {
    const slotEnd = new Date(cursor.getTime() + durationMs);
    const events = calendar.getEvents(cursor, slotEnd);
    if (events.length === 0) {
      suggestions.push({
        start: cursor.toISOString(),
        end: slotEnd.toISOString()
      });
    }
    cursor = new Date(cursor.getTime() + slotMinutes * 60000);
  }
  
  if (suggestions.length === 0) {
    const nextDay = new Date(start);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(BOOKING_DEFAULTS.WORK_START_HOUR, 0, 0, 0);
    const endOfDay = new Date(nextDay);
    endOfDay.setHours(BOOKING_DEFAULTS.WORK_END_HOUR, 0, 0, 0);
    cursor = new Date(nextDay);
    
    while (cursor.getTime() + durationMs <= endOfDay.getTime() && suggestions.length < 3) {
      const slotEnd = new Date(cursor.getTime() + durationMs);
      const events = calendar.getEvents(cursor, slotEnd);
      if (events.length === 0) {
        suggestions.push({
          start: cursor.toISOString(),
          end: slotEnd.toISOString()
        });
      }
      cursor = new Date(cursor.getTime() + slotMinutes * 60000);
    }
  }
  
  return suggestions;
}

function updateBookingRow_(sheet, rowIndex, updates) {
  const headers = BOOKING_HEADERS;
  Object.keys(updates).forEach(key => {
    const col = headers.indexOf(key);
    if (col !== -1) {
      sheet.getRange(rowIndex, col + 1).setValue(updates[key]);
    }
  });
}

function sendConfirmationEmail_(payload, event) {
  const subject = 'Randevu teyidi';
  const body = [
    'Merhaba ' + payload.name + ',',
    'Randevunuz onaylandı.',
    'Tarih/Saat: ' + payload.preferred_window_start,
    'Hizmet: ' + payload.service_type,
    'Notlar: ' + payload.notes
  ].join('\n');
  GmailApp.sendEmail(payload.email, subject, body);
}

function sendRescheduleEmail_(payload, suggestions) {
  const subject = 'Randevu için alternatif saatler';
  const lines = suggestions.map(s => '- ' + s.start + ' / ' + s.end);
  const body = [
    'Merhaba ' + payload.name + ',',
    'Seçtiğiniz saat uygun değil. Alternatifler:',
    lines.join('\n')
  ].join('\n');
  GmailApp.sendEmail(payload.email, subject, body);
}

function createFollowupTask_(payload, event) {
  const due = new Date(event.getStartTime().getTime() - 24 * 60 * 60000);
  TasksApp.getDefaultTaskList().createTask('Randevu hatırlatma: ' + payload.name, {
    notes: payload.service_type,
    due: due
  });
}
