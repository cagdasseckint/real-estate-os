// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS Booking System (Forms + Calendar + Sheets). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS Booking System (Forms + Calendar + Sheets)
// EXPLAIN: Bu satırın görevi: * Handles booking requests, availability checks, confirmations, and alternatives.. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handles booking requests, availability checks, confirmations, and alternatives.
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const BOOKING_SHEETS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const BOOKING_SHEETS = {
// EXPLAIN: Bu satırın görevi: REQUESTS: 'BookingRequests'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  REQUESTS: 'BookingRequests'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const BOOKING_HEADERS = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const BOOKING_HEADERS = [
// EXPLAIN: Bu satırın görevi: 'request_id', 'ts', 'name', 'email', 'phone', 'service_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'request_id', 'ts', 'name', 'email', 'phone', 'service_type',
// EXPLAIN: Bu satırın görevi: 'preferred_date', 'preferred_window_start', 'preferred_window_end',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'preferred_date', 'preferred_window_start', 'preferred_window_end',
// EXPLAIN: Bu satırın görevi: 'status', 'calendar_event_id', 'suggested_slots_json', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'status', 'calendar_event_id', 'suggested_slots_json', 'notes'
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const BOOKING_DEFAULTS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const BOOKING_DEFAULTS = {
// EXPLAIN: Bu satırın görevi: TIMEZONE: 'Europe/Istanbul',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TIMEZONE: 'Europe/Istanbul',
// EXPLAIN: Bu satırın görevi: WORK_START_HOUR: 10,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WORK_START_HOUR: 10,
// EXPLAIN: Bu satırın görevi: WORK_END_HOUR: 18,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WORK_END_HOUR: 18,
// EXPLAIN: Bu satırın görevi: DURATION_MINUTES: 30,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DURATION_MINUTES: 30,
// EXPLAIN: Bu satırın görevi: SLOT_INTERVAL_MINUTES: 30. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SLOT_INTERVAL_MINUTES: 30
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Bootstrap BookingRequests sheet with headers. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Bootstrap BookingRequests sheet with headers
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bootstrapBookingSheets_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bootstrapBookingSheets_() {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(BOOKING_SHEETS.REQUESTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let sheet = ss.getSheetByName(BOOKING_SHEETS.REQUESTS);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) {
// EXPLAIN: Bu satırın görevi: sheet = ss.insertSheet(BOOKING_SHEETS.REQUESTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet = ss.insertSheet(BOOKING_SHEETS.REQUESTS);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setValues([BOOKING_HEADERS]);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Form submit handler for bookings. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Form submit handler for bookings
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bookingOnFormSubmit(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bookingOnFormSubmit(e) {
// EXPLAIN: Bu satırın görevi: const payload = normalizeBookingPayload_(e);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const payload = normalizeBookingPayload_(e);
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOKING_SHEETS.REQUESTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOKING_SHEETS.REQUESTS);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('BookingRequests sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('BookingRequests sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const requestId = Utilities.getUuid();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const requestId = Utilities.getUuid();
// EXPLAIN: Bu satırın görevi: const now = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date();
// EXPLAIN: Bu satırın görevi: const row = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const row = {
// EXPLAIN: Bu satırın görevi: request_id: requestId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    request_id: requestId,
// EXPLAIN: Bu satırın görevi: ts: now.toISOString(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ts: now.toISOString(),
// EXPLAIN: Bu satırın görevi: name: payload.name,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    name: payload.name,
// EXPLAIN: Bu satırın görevi: email: payload.email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: payload.email,
// EXPLAIN: Bu satırın görevi: phone: payload.phone,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: payload.phone,
// EXPLAIN: Bu satırın görevi: service_type: payload.service_type,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    service_type: payload.service_type,
// EXPLAIN: Bu satırın görevi: preferred_date: payload.preferred_date,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_date: payload.preferred_date,
// EXPLAIN: Bu satırın görevi: preferred_window_start: payload.preferred_window_start,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_window_start: payload.preferred_window_start,
// EXPLAIN: Bu satırın görevi: preferred_window_end: payload.preferred_window_end,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_window_end: payload.preferred_window_end,
// EXPLAIN: Bu satırın görevi: status: 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: 'pending',
// EXPLAIN: Bu satırın görevi: calendar_event_id: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    calendar_event_id: '',
// EXPLAIN: Bu satırın görevi: suggested_slots_json: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    suggested_slots_json: '',
// EXPLAIN: Bu satırın görevi: notes: payload.notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: payload.notes
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow(BOOKING_HEADERS.map(h => row[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(BOOKING_HEADERS.map(h => row[h] || ''));
// EXPLAIN: Bu satırın görevi: const rowIndex = sheet.getLastRow();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rowIndex = sheet.getLastRow();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const availability = checkAvailability_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const availability = checkAvailability_(payload);
// EXPLAIN: Bu satırın görevi: if (availability.available) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (availability.available) {
// EXPLAIN: Bu satırın görevi: const event = createBookingEvent_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const event = createBookingEvent_(payload);
// EXPLAIN: Bu satırın görevi: updateBookingRow_(sheet, rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateBookingRow_(sheet, rowIndex, {
// EXPLAIN: Bu satırın görevi: status: 'confirmed',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: 'confirmed',
// EXPLAIN: Bu satırın görevi: calendar_event_id: event.getId(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      calendar_event_id: event.getId()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: sendConfirmationEmail_(payload, event);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sendConfirmationEmail_(payload, event);
// EXPLAIN: Bu satırın görevi: createFollowupTask_(payload, event);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    createFollowupTask_(payload, event);
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } else {
// EXPLAIN: Bu satırın görevi: const suggestions = suggestAlternativeSlots_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const suggestions = suggestAlternativeSlots_(payload);
// EXPLAIN: Bu satırın görevi: const status = suggestions.length > 0 ? 'rescheduled' : 'declined';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const status = suggestions.length > 0 ? 'rescheduled' : 'declined';
// EXPLAIN: Bu satırın görevi: updateBookingRow_(sheet, rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateBookingRow_(sheet, rowIndex, {
// EXPLAIN: Bu satırın görevi: status: status,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: status,
// EXPLAIN: Bu satırın görevi: suggested_slots_json: JSON.stringify(suggestions). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      suggested_slots_json: JSON.stringify(suggestions)
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: if (suggestions.length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (suggestions.length > 0) {
// EXPLAIN: Bu satırın görevi: sendRescheduleEmail_(payload, suggestions);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sendRescheduleEmail_(payload, suggestions);
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else {
// EXPLAIN: Bu satırın görevi: sendDeclinedEmail_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sendDeclinedEmail_(payload);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function normalizeBookingPayload_(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeBookingPayload_(e) {
// EXPLAIN: Bu satırın görevi: const named = e && e.namedValues ? e.namedValues : {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const named = e && e.namedValues ? e.namedValues : {};
// EXPLAIN: Bu satırın görevi: const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const preferredDate = getValue('Tercih edilen gün');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const preferredDate = getValue('Tercih edilen gün');
// EXPLAIN: Bu satırın görevi: const window = getValue('Tercih edilen saat aralığı');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const window = getValue('Tercih edilen saat aralığı');
// EXPLAIN: Bu satırın görevi: const parsedWindow = parseTimeWindow_(preferredDate, window);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const parsedWindow = parseTimeWindow_(preferredDate, window);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: name: getValue('Ad Soyad'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    name: getValue('Ad Soyad'),
// EXPLAIN: Bu satırın görevi: email: getValue('Email'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: getValue('Email'),
// EXPLAIN: Bu satırın görevi: phone: normalizePhoneBooking_(getValue('Telefon')),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: normalizePhoneBooking_(getValue('Telefon')),
// EXPLAIN: Bu satırın görevi: service_type: getValue('Hizmet türü'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    service_type: getValue('Hizmet türü'),
// EXPLAIN: Bu satırın görevi: preferred_date: preferredDate,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_date: preferredDate,
// EXPLAIN: Bu satırın görevi: preferred_window_start: parsedWindow.start,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_window_start: parsedWindow.start,
// EXPLAIN: Bu satırın görevi: preferred_window_end: parsedWindow.end,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_window_end: parsedWindow.end,
// EXPLAIN: Bu satırın görevi: notes: getValue('Not'). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: getValue('Not')
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function normalizePhoneBooking_(phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizePhoneBooking_(phone) {
// EXPLAIN: Bu satırın görevi: return phone ? phone.replace(/\D/g, '') : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return phone ? phone.replace(/\D/g, '') : '';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function parseTimeWindow_(dateStr, windowStr) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function parseTimeWindow_(dateStr, windowStr) {
// EXPLAIN: Bu satırın görevi: const tz = BOOKING_DEFAULTS.TIMEZONE;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const tz = BOOKING_DEFAULTS.TIMEZONE;
// EXPLAIN: Bu satırın görevi: let date = new Date(dateStr);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let date = new Date(dateStr);
// EXPLAIN: Bu satırın görevi: if (isNaN(date.getTime())) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (isNaN(date.getTime())) {
// EXPLAIN: Bu satırın görevi: date = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    date = new Date();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: const parts = windowStr.split('-').map(p => p.trim());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const parts = windowStr.split('-').map(p => p.trim());
// EXPLAIN: Bu satırın görevi: const start = parts[0] || '10:00';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const start = parts[0] || '10:00';
// EXPLAIN: Bu satırın görevi: const end = parts[1] || '18:00';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const end = parts[1] || '18:00';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const startDate = new Date(date);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const startDate = new Date(date);
// EXPLAIN: Bu satırın görevi: const endDate = new Date(date);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const endDate = new Date(date);
// EXPLAIN: Bu satırın görevi: const startParts = start.split(':');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const startParts = start.split(':');
// EXPLAIN: Bu satırın görevi: const endParts = end.split(':');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const endParts = end.split(':');
// EXPLAIN: Bu satırın görevi: startDate.setHours(Number(startParts[0]), Number(startParts[1]), 0, 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  startDate.setHours(Number(startParts[0]), Number(startParts[1]), 0, 0);
// EXPLAIN: Bu satırın görevi: endDate.setHours(Number(endParts[0]), Number(endParts[1]), 0, 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  endDate.setHours(Number(endParts[0]), Number(endParts[1]), 0, 0);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: start: Utilities.formatDate(startDate, tz, "yyyy-MM-dd'T'HH:mm:ss"),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    start: Utilities.formatDate(startDate, tz, "yyyy-MM-dd'T'HH:mm:ss"),
// EXPLAIN: Bu satırın görevi: end: Utilities.formatDate(endDate, tz, "yyyy-MM-dd'T'HH:mm:ss"). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    end: Utilities.formatDate(endDate, tz, "yyyy-MM-dd'T'HH:mm:ss")
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function checkAvailability_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function checkAvailability_(payload) {
// EXPLAIN: Bu satırın görevi: const calendar = CalendarApp.getDefaultCalendar();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const calendar = CalendarApp.getDefaultCalendar();
// EXPLAIN: Bu satırın görevi: const start = new Date(payload.preferred_window_start);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const start = new Date(payload.preferred_window_start);
// EXPLAIN: Bu satırın görevi: const end = new Date(payload.preferred_window_end);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const end = new Date(payload.preferred_window_end);
// EXPLAIN: Bu satırın görevi: const events = calendar.getEvents(start, end);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const events = calendar.getEvents(start, end);
// EXPLAIN: Bu satırın görevi: return { available: events.length === 0 };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { available: events.length === 0 };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function createBookingEvent_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createBookingEvent_(payload) {
// EXPLAIN: Bu satırın görevi: const calendar = CalendarApp.getDefaultCalendar();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const calendar = CalendarApp.getDefaultCalendar();
// EXPLAIN: Bu satırın görevi: const start = new Date(payload.preferred_window_start);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const start = new Date(payload.preferred_window_start);
// EXPLAIN: Bu satırın görevi: const end = new Date(start.getTime() + BOOKING_DEFAULTS.DURATION_MINUTES * 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const end = new Date(start.getTime() + BOOKING_DEFAULTS.DURATION_MINUTES * 60000);
// EXPLAIN: Bu satırın görevi: const title = payload.service_type + ' - ' + payload.name;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const title = payload.service_type + ' - ' + payload.name;
// EXPLAIN: Bu satırın görevi: const description = 'Booking request from ' + payload.name + '\n' +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const description = 'Booking request from ' + payload.name + '\n' +
// EXPLAIN: Bu satırın görevi: 'Email: ' + payload.email + '\n' +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Email: ' + payload.email + '\n' +
// EXPLAIN: Bu satırın görevi: 'Phone: ' + payload.phone + '\n' +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Phone: ' + payload.phone + '\n' +
// EXPLAIN: Bu satırın görevi: 'Notes: ' + payload.notes;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Notes: ' + payload.notes;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return calendar.createEvent(title, start, end, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return calendar.createEvent(title, start, end, {
// EXPLAIN: Bu satırın görevi: guests: payload.email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    guests: payload.email,
// EXPLAIN: Bu satırın görevi: description: description. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    description: description
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function suggestAlternativeSlots_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function suggestAlternativeSlots_(payload) {
// EXPLAIN: Bu satırın görevi: const suggestions = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const suggestions = [];
// EXPLAIN: Bu satırın görevi: const calendar = CalendarApp.getDefaultCalendar();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const calendar = CalendarApp.getDefaultCalendar();
// EXPLAIN: Bu satırın görevi: const start = new Date(payload.preferred_window_start);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const start = new Date(payload.preferred_window_start);
// EXPLAIN: Bu satırın görevi: const end = new Date(payload.preferred_window_end);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const end = new Date(payload.preferred_window_end);
// EXPLAIN: Bu satırın görevi: const slotMinutes = BOOKING_DEFAULTS.SLOT_INTERVAL_MINUTES;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const slotMinutes = BOOKING_DEFAULTS.SLOT_INTERVAL_MINUTES;
// EXPLAIN: Bu satırın görevi: const durationMs = BOOKING_DEFAULTS.DURATION_MINUTES * 60000;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const durationMs = BOOKING_DEFAULTS.DURATION_MINUTES * 60000;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: let cursor = new Date(start);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let cursor = new Date(start);
// EXPLAIN: Bu satırın görevi: while (cursor.getTime() + durationMs <= end.getTime() && suggestions.length < 3) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  while (cursor.getTime() + durationMs <= end.getTime() && suggestions.length < 3) {
// EXPLAIN: Bu satırın görevi: const slotEnd = new Date(cursor.getTime() + durationMs);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const slotEnd = new Date(cursor.getTime() + durationMs);
// EXPLAIN: Bu satırın görevi: const events = calendar.getEvents(cursor, slotEnd);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const events = calendar.getEvents(cursor, slotEnd);
// EXPLAIN: Bu satırın görevi: if (events.length === 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (events.length === 0) {
// EXPLAIN: Bu satırın görevi: suggestions.push({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      suggestions.push({
// EXPLAIN: Bu satırın görevi: start: cursor.toISOString(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        start: cursor.toISOString(),
// EXPLAIN: Bu satırın görevi: end: slotEnd.toISOString(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        end: slotEnd.toISOString()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: cursor = new Date(cursor.getTime() + slotMinutes * 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursor = new Date(cursor.getTime() + slotMinutes * 60000);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (suggestions.length === 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (suggestions.length === 0) {
// EXPLAIN: Bu satırın görevi: const nextDay = new Date(start);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const nextDay = new Date(start);
// EXPLAIN: Bu satırın görevi: nextDay.setDate(nextDay.getDate() + 1);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    nextDay.setDate(nextDay.getDate() + 1);
// EXPLAIN: Bu satırın görevi: nextDay.setHours(BOOKING_DEFAULTS.WORK_START_HOUR, 0, 0, 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    nextDay.setHours(BOOKING_DEFAULTS.WORK_START_HOUR, 0, 0, 0);
// EXPLAIN: Bu satırın görevi: const endOfDay = new Date(nextDay);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const endOfDay = new Date(nextDay);
// EXPLAIN: Bu satırın görevi: endOfDay.setHours(BOOKING_DEFAULTS.WORK_END_HOUR, 0, 0, 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    endOfDay.setHours(BOOKING_DEFAULTS.WORK_END_HOUR, 0, 0, 0);
// EXPLAIN: Bu satırın görevi: cursor = new Date(nextDay);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursor = new Date(nextDay);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: while (cursor.getTime() + durationMs <= endOfDay.getTime() && suggestions.length < 3) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    while (cursor.getTime() + durationMs <= endOfDay.getTime() && suggestions.length < 3) {
// EXPLAIN: Bu satırın görevi: const slotEnd = new Date(cursor.getTime() + durationMs);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const slotEnd = new Date(cursor.getTime() + durationMs);
// EXPLAIN: Bu satırın görevi: const events = calendar.getEvents(cursor, slotEnd);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const events = calendar.getEvents(cursor, slotEnd);
// EXPLAIN: Bu satırın görevi: if (events.length === 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (events.length === 0) {
// EXPLAIN: Bu satırın görevi: suggestions.push({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        suggestions.push({
// EXPLAIN: Bu satırın görevi: start: cursor.toISOString(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          start: cursor.toISOString(),
// EXPLAIN: Bu satırın görevi: end: slotEnd.toISOString(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          end: slotEnd.toISOString()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: cursor = new Date(cursor.getTime() + slotMinutes * 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      cursor = new Date(cursor.getTime() + slotMinutes * 60000);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return suggestions;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return suggestions;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function updateBookingRow_(sheet, rowIndex, updates) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function updateBookingRow_(sheet, rowIndex, updates) {
// EXPLAIN: Bu satırın görevi: const headers = BOOKING_HEADERS;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = BOOKING_HEADERS;
// EXPLAIN: Bu satırın görevi: Object.keys(updates).forEach(key => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Object.keys(updates).forEach(key => {
// EXPLAIN: Bu satırın görevi: const col = headers.indexOf(key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const col = headers.indexOf(key);
// EXPLAIN: Bu satırın görevi: if (col !== -1) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (col !== -1) {
// EXPLAIN: Bu satırın görevi: sheet.getRange(rowIndex, col + 1).setValue(updates[key]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(rowIndex, col + 1).setValue(updates[key]);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function sendConfirmationEmail_(payload, event) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function sendConfirmationEmail_(payload, event) {
// EXPLAIN: Bu satırın görevi: const subject = 'Randevu teyidi';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const subject = 'Randevu teyidi';
// EXPLAIN: Bu satırın görevi: const body = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = [
// EXPLAIN: Bu satırın görevi: 'Merhaba ' + payload.name + ',',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Merhaba ' + payload.name + ',',
// EXPLAIN: Bu satırın görevi: 'Randevunuz onaylandı.',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Randevunuz onaylandı.',
// EXPLAIN: Bu satırın görevi: 'Tarih/Saat: ' + payload.preferred_window_start,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Tarih/Saat: ' + payload.preferred_window_start,
// EXPLAIN: Bu satırın görevi: 'Hizmet: ' + payload.service_type,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Hizmet: ' + payload.service_type,
// EXPLAIN: Bu satırın görevi: 'Notlar: ' + payload.notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Notlar: ' + payload.notes
// EXPLAIN: Bu satırın görevi: ].join('\n');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ].join('\n');
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(payload.email, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function sendRescheduleEmail_(payload, suggestions) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function sendRescheduleEmail_(payload, suggestions) {
// EXPLAIN: Bu satırın görevi: const subject = 'Randevu için alternatif saatler';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const subject = 'Randevu için alternatif saatler';
// EXPLAIN: Bu satırın görevi: const lines = suggestions.map(s => '- ' + s.start + ' / ' + s.end);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lines = suggestions.map(s => '- ' + s.start + ' / ' + s.end);
// EXPLAIN: Bu satırın görevi: const body = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = [
// EXPLAIN: Bu satırın görevi: 'Merhaba ' + payload.name + ',',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Merhaba ' + payload.name + ',',
// EXPLAIN: Bu satırın görevi: 'Seçtiğiniz saat uygun değil. Alternatifler:',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Seçtiğiniz saat uygun değil. Alternatifler:',
// EXPLAIN: Bu satırın görevi: lines.join('\n'). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    lines.join('\n')
// EXPLAIN: Bu satırın görevi: ].join('\n');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ].join('\n');
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(payload.email, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function sendDeclinedEmail_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function sendDeclinedEmail_(payload) {
// EXPLAIN: Bu satırın görevi: const subject = 'Randevu talebi için uygunluk yok';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const subject = 'Randevu talebi için uygunluk yok';
// EXPLAIN: Bu satırın görevi: const body = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = [
// EXPLAIN: Bu satırın görevi: 'Merhaba ' + payload.name + ',',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Merhaba ' + payload.name + ',',
// EXPLAIN: Bu satırın görevi: 'Seçtiğiniz tarih ve saat aralığında uygunluk bulunamadı.',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Seçtiğiniz tarih ve saat aralığında uygunluk bulunamadı.',
// EXPLAIN: Bu satırın görevi: 'Dilerseniz farklı bir gün/saat ile tekrar talep oluşturabilirsiniz.'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Dilerseniz farklı bir gün/saat ile tekrar talep oluşturabilirsiniz.'
// EXPLAIN: Bu satırın görevi: ].join('\n');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ].join('\n');
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(payload.email, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function createFollowupTask_(payload, event) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createFollowupTask_(payload, event) {
// EXPLAIN: Bu satırın görevi: const due = new Date(event.getStartTime().getTime() - 24 * 60 * 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const due = new Date(event.getStartTime().getTime() - 24 * 60 * 60000);
// EXPLAIN: Bu satırın görevi: TasksApp.getDefaultTaskList().createTask('Randevu hatırlatma: ' + payload.name, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TasksApp.getDefaultTaskList().createTask('Randevu hatırlatma: ' + payload.name, {
// EXPLAIN: Bu satırın görevi: notes: payload.service_type,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: payload.service_type,
// EXPLAIN: Bu satırın görevi: due: due. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    due: due
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
