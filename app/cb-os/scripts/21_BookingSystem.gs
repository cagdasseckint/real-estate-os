// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS Booking System (Forms + Calendar + Sheets)
 * CB-OS Booking System (Forms + Calendar + Sheets)
// EXPLAIN: * Handles booking requests, availability checks, confirmations, and alternatives.
 * Handles booking requests, availability checks, confirmations, and alternatives.
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const BOOKING_SHEETS = {
const BOOKING_SHEETS = {
// EXPLAIN: REQUESTS: 'BookingRequests'
  REQUESTS: 'BookingRequests'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const BOOKING_HEADERS = [
const BOOKING_HEADERS = [
// EXPLAIN: 'request_id', 'ts', 'name', 'email', 'phone', 'service_type',
  'request_id', 'ts', 'name', 'email', 'phone', 'service_type',
// EXPLAIN: 'preferred_date', 'preferred_window_start', 'preferred_window_end',
  'preferred_date', 'preferred_window_start', 'preferred_window_end',
// EXPLAIN: 'status', 'calendar_event_id', 'suggested_slots_json', 'notes'
  'status', 'calendar_event_id', 'suggested_slots_json', 'notes'
// EXPLAIN: ];
];
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const BOOKING_DEFAULTS = {
const BOOKING_DEFAULTS = {
// EXPLAIN: TIMEZONE: 'Europe/Istanbul',
  TIMEZONE: 'Europe/Istanbul',
// EXPLAIN: WORK_START_HOUR: 10,
  WORK_START_HOUR: 10,
// EXPLAIN: WORK_END_HOUR: 18,
  WORK_END_HOUR: 18,
// EXPLAIN: DURATION_MINUTES: 30,
  DURATION_MINUTES: 30,
// EXPLAIN: SLOT_INTERVAL_MINUTES: 30
  SLOT_INTERVAL_MINUTES: 30
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Bootstrap BookingRequests sheet with headers
 * Bootstrap BookingRequests sheet with headers
// EXPLAIN: */
 */
// EXPLAIN: function bootstrapBookingSheets_() {
function bootstrapBookingSheets_() {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: let sheet = ss.getSheetByName(BOOKING_SHEETS.REQUESTS);
  let sheet = ss.getSheetByName(BOOKING_SHEETS.REQUESTS);
// EXPLAIN: if (!sheet) {
  if (!sheet) {
// EXPLAIN: sheet = ss.insertSheet(BOOKING_SHEETS.REQUESTS);
    sheet = ss.insertSheet(BOOKING_SHEETS.REQUESTS);
// EXPLAIN: sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]);
    sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]);
// EXPLAIN: sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setFontWeight('bold');
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Form submit handler for bookings
 * Form submit handler for bookings
// EXPLAIN: */
 */
// EXPLAIN: function bookingOnFormSubmit(e) {
function bookingOnFormSubmit(e) {
// EXPLAIN: const payload = normalizeBookingPayload_(e);
  const payload = normalizeBookingPayload_(e);
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOKING_SHEETS.REQUESTS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOKING_SHEETS.REQUESTS);
// EXPLAIN: if (!sheet) throw new Error('BookingRequests sheet missing');
  if (!sheet) throw new Error('BookingRequests sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const requestId = Utilities.getUuid();
  const requestId = Utilities.getUuid();
// EXPLAIN: const now = new Date();
  const now = new Date();
// EXPLAIN: const row = {
  const row = {
// EXPLAIN: request_id: requestId,
    request_id: requestId,
// EXPLAIN: ts: now.toISOString(),
    ts: now.toISOString(),
// EXPLAIN: name: payload.name,
    name: payload.name,
// EXPLAIN: email: payload.email,
    email: payload.email,
// EXPLAIN: phone: payload.phone,
    phone: payload.phone,
// EXPLAIN: service_type: payload.service_type,
    service_type: payload.service_type,
// EXPLAIN: preferred_date: payload.preferred_date,
    preferred_date: payload.preferred_date,
// EXPLAIN: preferred_window_start: payload.preferred_window_start,
    preferred_window_start: payload.preferred_window_start,
// EXPLAIN: preferred_window_end: payload.preferred_window_end,
    preferred_window_end: payload.preferred_window_end,
// EXPLAIN: status: 'pending',
    status: 'pending',
// EXPLAIN: calendar_event_id: '',
    calendar_event_id: '',
// EXPLAIN: suggested_slots_json: '',
    suggested_slots_json: '',
// EXPLAIN: notes: payload.notes
    notes: payload.notes
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow(BOOKING_HEADERS.map(h => row[h] || ''));
  sheet.appendRow(BOOKING_HEADERS.map(h => row[h] || ''));
// EXPLAIN: const rowIndex = sheet.getLastRow();
  const rowIndex = sheet.getLastRow();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const availability = checkAvailability_(payload);
  const availability = checkAvailability_(payload);
// EXPLAIN: if (availability.available) {
  if (availability.available) {
// EXPLAIN: const event = createBookingEvent_(payload);
    const event = createBookingEvent_(payload);
// EXPLAIN: updateBookingRow_(sheet, rowIndex, {
    updateBookingRow_(sheet, rowIndex, {
// EXPLAIN: status: 'confirmed',
      status: 'confirmed',
// EXPLAIN: calendar_event_id: event.getId()
      calendar_event_id: event.getId()
// EXPLAIN: });
    });
// EXPLAIN: sendConfirmationEmail_(payload, event);
    sendConfirmationEmail_(payload, event);
// EXPLAIN: createFollowupTask_(payload, event);
    createFollowupTask_(payload, event);
// EXPLAIN: } else {
  } else {
// EXPLAIN: const suggestions = suggestAlternativeSlots_(payload);
    const suggestions = suggestAlternativeSlots_(payload);
// EXPLAIN: const status = suggestions.length > 0 ? 'rescheduled' : 'declined';
    const status = suggestions.length > 0 ? 'rescheduled' : 'declined';
// EXPLAIN: updateBookingRow_(sheet, rowIndex, {
    updateBookingRow_(sheet, rowIndex, {
// EXPLAIN: status: status,
      status: status,
// EXPLAIN: suggested_slots_json: JSON.stringify(suggestions)
      suggested_slots_json: JSON.stringify(suggestions)
// EXPLAIN: });
    });
// EXPLAIN: if (suggestions.length > 0) {
    if (suggestions.length > 0) {
// EXPLAIN: sendRescheduleEmail_(payload, suggestions);
      sendRescheduleEmail_(payload, suggestions);
// EXPLAIN: } else {
    } else {
// EXPLAIN: sendDeclinedEmail_(payload);
      sendDeclinedEmail_(payload);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function normalizeBookingPayload_(e) {
function normalizeBookingPayload_(e) {
// EXPLAIN: const named = e && e.namedValues ? e.namedValues : {};
  const named = e && e.namedValues ? e.namedValues : {};
// EXPLAIN: const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
  const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const preferredDate = getValue('Tercih edilen gün');
  const preferredDate = getValue('Tercih edilen gün');
// EXPLAIN: const window = getValue('Tercih edilen saat aralığı');
  const window = getValue('Tercih edilen saat aralığı');
// EXPLAIN: const parsedWindow = parseTimeWindow_(preferredDate, window);
  const parsedWindow = parseTimeWindow_(preferredDate, window);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: name: getValue('Ad Soyad'),
    name: getValue('Ad Soyad'),
// EXPLAIN: email: getValue('Email'),
    email: getValue('Email'),
// EXPLAIN: phone: normalizePhoneBooking_(getValue('Telefon')),
    phone: normalizePhoneBooking_(getValue('Telefon')),
// EXPLAIN: service_type: getValue('Hizmet türü'),
    service_type: getValue('Hizmet türü'),
// EXPLAIN: preferred_date: preferredDate,
    preferred_date: preferredDate,
// EXPLAIN: preferred_window_start: parsedWindow.start,
    preferred_window_start: parsedWindow.start,
// EXPLAIN: preferred_window_end: parsedWindow.end,
    preferred_window_end: parsedWindow.end,
// EXPLAIN: notes: getValue('Not')
    notes: getValue('Not')
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function normalizePhoneBooking_(phone) {
function normalizePhoneBooking_(phone) {
// EXPLAIN: return phone ? phone.replace(/\D/g, '') : '';
  return phone ? phone.replace(/\D/g, '') : '';
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function parseTimeWindow_(dateStr, windowStr) {
function parseTimeWindow_(dateStr, windowStr) {
// EXPLAIN: const tz = BOOKING_DEFAULTS.TIMEZONE;
  const tz = BOOKING_DEFAULTS.TIMEZONE;
// EXPLAIN: let date = new Date(dateStr);
  let date = new Date(dateStr);
// EXPLAIN: if (isNaN(date.getTime())) {
  if (isNaN(date.getTime())) {
// EXPLAIN: date = new Date();
    date = new Date();
// EXPLAIN: }
  }
// EXPLAIN: const parts = windowStr.split('-').map(p => p.trim());
  const parts = windowStr.split('-').map(p => p.trim());
// EXPLAIN: const start = parts[0] || '10:00';
  const start = parts[0] || '10:00';
// EXPLAIN: const end = parts[1] || '18:00';
  const end = parts[1] || '18:00';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const startDate = new Date(date);
  const startDate = new Date(date);
// EXPLAIN: const endDate = new Date(date);
  const endDate = new Date(date);
// EXPLAIN: const startParts = start.split(':');
  const startParts = start.split(':');
// EXPLAIN: const endParts = end.split(':');
  const endParts = end.split(':');
// EXPLAIN: startDate.setHours(Number(startParts[0]), Number(startParts[1]), 0, 0);
  startDate.setHours(Number(startParts[0]), Number(startParts[1]), 0, 0);
// EXPLAIN: endDate.setHours(Number(endParts[0]), Number(endParts[1]), 0, 0);
  endDate.setHours(Number(endParts[0]), Number(endParts[1]), 0, 0);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: start: Utilities.formatDate(startDate, tz, "yyyy-MM-dd'T'HH:mm:ss"),
    start: Utilities.formatDate(startDate, tz, "yyyy-MM-dd'T'HH:mm:ss"),
// EXPLAIN: end: Utilities.formatDate(endDate, tz, "yyyy-MM-dd'T'HH:mm:ss")
    end: Utilities.formatDate(endDate, tz, "yyyy-MM-dd'T'HH:mm:ss")
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function checkAvailability_(payload) {
function checkAvailability_(payload) {
// EXPLAIN: const calendar = CalendarApp.getDefaultCalendar();
  const calendar = CalendarApp.getDefaultCalendar();
// EXPLAIN: const start = new Date(payload.preferred_window_start);
  const start = new Date(payload.preferred_window_start);
// EXPLAIN: const end = new Date(payload.preferred_window_end);
  const end = new Date(payload.preferred_window_end);
// EXPLAIN: const events = calendar.getEvents(start, end);
  const events = calendar.getEvents(start, end);
// EXPLAIN: return { available: events.length === 0 };
  return { available: events.length === 0 };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function createBookingEvent_(payload) {
function createBookingEvent_(payload) {
// EXPLAIN: const calendar = CalendarApp.getDefaultCalendar();
  const calendar = CalendarApp.getDefaultCalendar();
// EXPLAIN: const start = new Date(payload.preferred_window_start);
  const start = new Date(payload.preferred_window_start);
// EXPLAIN: const end = new Date(start.getTime() + BOOKING_DEFAULTS.DURATION_MINUTES * 60000);
  const end = new Date(start.getTime() + BOOKING_DEFAULTS.DURATION_MINUTES * 60000);
// EXPLAIN: const title = payload.service_type + ' - ' + payload.name;
  const title = payload.service_type + ' - ' + payload.name;
// EXPLAIN: const description = 'Booking request from ' + payload.name + '\n' +
  const description = 'Booking request from ' + payload.name + '\n' +
// EXPLAIN: 'Email: ' + payload.email + '\n' +
    'Email: ' + payload.email + '\n' +
// EXPLAIN: 'Phone: ' + payload.phone + '\n' +
    'Phone: ' + payload.phone + '\n' +
// EXPLAIN: 'Notes: ' + payload.notes;
    'Notes: ' + payload.notes;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return calendar.createEvent(title, start, end, {
  return calendar.createEvent(title, start, end, {
// EXPLAIN: guests: payload.email,
    guests: payload.email,
// EXPLAIN: description: description
    description: description
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function suggestAlternativeSlots_(payload) {
function suggestAlternativeSlots_(payload) {
// EXPLAIN: const suggestions = [];
  const suggestions = [];
// EXPLAIN: const calendar = CalendarApp.getDefaultCalendar();
  const calendar = CalendarApp.getDefaultCalendar();
// EXPLAIN: const start = new Date(payload.preferred_window_start);
  const start = new Date(payload.preferred_window_start);
// EXPLAIN: const end = new Date(payload.preferred_window_end);
  const end = new Date(payload.preferred_window_end);
// EXPLAIN: const slotMinutes = BOOKING_DEFAULTS.SLOT_INTERVAL_MINUTES;
  const slotMinutes = BOOKING_DEFAULTS.SLOT_INTERVAL_MINUTES;
// EXPLAIN: const durationMs = BOOKING_DEFAULTS.DURATION_MINUTES * 60000;
  const durationMs = BOOKING_DEFAULTS.DURATION_MINUTES * 60000;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let cursor = new Date(start);
  let cursor = new Date(start);
// EXPLAIN: while (cursor.getTime() + durationMs <= end.getTime() && suggestions.length < 3) {
  while (cursor.getTime() + durationMs <= end.getTime() && suggestions.length < 3) {
// EXPLAIN: const slotEnd = new Date(cursor.getTime() + durationMs);
    const slotEnd = new Date(cursor.getTime() + durationMs);
// EXPLAIN: const events = calendar.getEvents(cursor, slotEnd);
    const events = calendar.getEvents(cursor, slotEnd);
// EXPLAIN: if (events.length === 0) {
    if (events.length === 0) {
// EXPLAIN: suggestions.push({
      suggestions.push({
// EXPLAIN: start: cursor.toISOString(),
        start: cursor.toISOString(),
// EXPLAIN: end: slotEnd.toISOString()
        end: slotEnd.toISOString()
// EXPLAIN: });
      });
// EXPLAIN: }
    }
// EXPLAIN: cursor = new Date(cursor.getTime() + slotMinutes * 60000);
    cursor = new Date(cursor.getTime() + slotMinutes * 60000);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (suggestions.length === 0) {
  if (suggestions.length === 0) {
// EXPLAIN: const nextDay = new Date(start);
    const nextDay = new Date(start);
// EXPLAIN: nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setDate(nextDay.getDate() + 1);
// EXPLAIN: nextDay.setHours(BOOKING_DEFAULTS.WORK_START_HOUR, 0, 0, 0);
    nextDay.setHours(BOOKING_DEFAULTS.WORK_START_HOUR, 0, 0, 0);
// EXPLAIN: const endOfDay = new Date(nextDay);
    const endOfDay = new Date(nextDay);
// EXPLAIN: endOfDay.setHours(BOOKING_DEFAULTS.WORK_END_HOUR, 0, 0, 0);
    endOfDay.setHours(BOOKING_DEFAULTS.WORK_END_HOUR, 0, 0, 0);
// EXPLAIN: cursor = new Date(nextDay);
    cursor = new Date(nextDay);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: while (cursor.getTime() + durationMs <= endOfDay.getTime() && suggestions.length < 3) {
    while (cursor.getTime() + durationMs <= endOfDay.getTime() && suggestions.length < 3) {
// EXPLAIN: const slotEnd = new Date(cursor.getTime() + durationMs);
      const slotEnd = new Date(cursor.getTime() + durationMs);
// EXPLAIN: const events = calendar.getEvents(cursor, slotEnd);
      const events = calendar.getEvents(cursor, slotEnd);
// EXPLAIN: if (events.length === 0) {
      if (events.length === 0) {
// EXPLAIN: suggestions.push({
        suggestions.push({
// EXPLAIN: start: cursor.toISOString(),
          start: cursor.toISOString(),
// EXPLAIN: end: slotEnd.toISOString()
          end: slotEnd.toISOString()
// EXPLAIN: });
        });
// EXPLAIN: }
      }
// EXPLAIN: cursor = new Date(cursor.getTime() + slotMinutes * 60000);
      cursor = new Date(cursor.getTime() + slotMinutes * 60000);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return suggestions;
  return suggestions;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function updateBookingRow_(sheet, rowIndex, updates) {
function updateBookingRow_(sheet, rowIndex, updates) {
// EXPLAIN: const headers = BOOKING_HEADERS;
  const headers = BOOKING_HEADERS;
// EXPLAIN: Object.keys(updates).forEach(key => {
  Object.keys(updates).forEach(key => {
// EXPLAIN: const col = headers.indexOf(key);
    const col = headers.indexOf(key);
// EXPLAIN: if (col !== -1) {
    if (col !== -1) {
// EXPLAIN: sheet.getRange(rowIndex, col + 1).setValue(updates[key]);
      sheet.getRange(rowIndex, col + 1).setValue(updates[key]);
// EXPLAIN: }
    }
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function sendConfirmationEmail_(payload, event) {
function sendConfirmationEmail_(payload, event) {
// EXPLAIN: const subject = 'Randevu teyidi';
  const subject = 'Randevu teyidi';
// EXPLAIN: const body = [
  const body = [
// EXPLAIN: 'Merhaba ' + payload.name + ',',
    'Merhaba ' + payload.name + ',',
// EXPLAIN: 'Randevunuz onaylandı.',
    'Randevunuz onaylandı.',
// EXPLAIN: 'Tarih/Saat: ' + payload.preferred_window_start,
    'Tarih/Saat: ' + payload.preferred_window_start,
// EXPLAIN: 'Hizmet: ' + payload.service_type,
    'Hizmet: ' + payload.service_type,
// EXPLAIN: 'Notlar: ' + payload.notes
    'Notlar: ' + payload.notes
// EXPLAIN: ].join('\n');
  ].join('\n');
// EXPLAIN: GmailApp.sendEmail(payload.email, subject, body);
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function sendRescheduleEmail_(payload, suggestions) {
function sendRescheduleEmail_(payload, suggestions) {
// EXPLAIN: const subject = 'Randevu için alternatif saatler';
  const subject = 'Randevu için alternatif saatler';
// EXPLAIN: const lines = suggestions.map(s => '- ' + s.start + ' / ' + s.end);
  const lines = suggestions.map(s => '- ' + s.start + ' / ' + s.end);
// EXPLAIN: const body = [
  const body = [
// EXPLAIN: 'Merhaba ' + payload.name + ',',
    'Merhaba ' + payload.name + ',',
// EXPLAIN: 'Seçtiğiniz saat uygun değil. Alternatifler:',
    'Seçtiğiniz saat uygun değil. Alternatifler:',
// EXPLAIN: lines.join('\n')
    lines.join('\n')
// EXPLAIN: ].join('\n');
  ].join('\n');
// EXPLAIN: GmailApp.sendEmail(payload.email, subject, body);
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function sendDeclinedEmail_(payload) {
function sendDeclinedEmail_(payload) {
// EXPLAIN: const subject = 'Randevu talebi için uygunluk yok';
  const subject = 'Randevu talebi için uygunluk yok';
// EXPLAIN: const body = [
  const body = [
// EXPLAIN: 'Merhaba ' + payload.name + ',',
    'Merhaba ' + payload.name + ',',
// EXPLAIN: 'Seçtiğiniz tarih ve saat aralığında uygunluk bulunamadı.',
    'Seçtiğiniz tarih ve saat aralığında uygunluk bulunamadı.',
// EXPLAIN: 'Dilerseniz farklı bir gün/saat ile tekrar talep oluşturabilirsiniz.'
    'Dilerseniz farklı bir gün/saat ile tekrar talep oluşturabilirsiniz.'
// EXPLAIN: ].join('\n');
  ].join('\n');
// EXPLAIN: GmailApp.sendEmail(payload.email, subject, body);
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function createFollowupTask_(payload, event) {
function createFollowupTask_(payload, event) {
// EXPLAIN: const due = new Date(event.getStartTime().getTime() - 24 * 60 * 60000);
  const due = new Date(event.getStartTime().getTime() - 24 * 60 * 60000);
// EXPLAIN: TasksApp.getDefaultTaskList().createTask('Randevu hatırlatma: ' + payload.name, {
  TasksApp.getDefaultTaskList().createTask('Randevu hatırlatma: ' + payload.name, {
// EXPLAIN: notes: payload.service_type,
    notes: payload.service_type,
// EXPLAIN: due: due
    due: due
// EXPLAIN: });
  });
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
