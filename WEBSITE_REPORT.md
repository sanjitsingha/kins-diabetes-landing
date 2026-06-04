

## 1. Pages on the Website

| Page | Web Address | Purpose |
|------|-------------|---------|
| Main Landing Page | `/` | Primary marketing page shown to visitors |
| Book Appointment | `/book-appointment` | Form where patient fills their details |
| Thank You | `/thank-you` | Shown after form is successfully submitted |

---

## 2. The Appointment Booking Form

**Page:** `/book-appointment`

### Fields collected from the patient:
| Field | What it asks |
|-------|-------------|
| Full Name | Patient's name |
| Mobile Number | 10-digit Indian mobile number |
| City | Patient's city (e.g. Siliguri, Darjeeling) |
| Are You Diabetic? | Yes / No radio button |
| How Can I Help You? | Dropdown: Doctor's Consultation / Diabetes Counselling / Whole Body Check-Up |

---

## 3. Where the Lead Data Goes (The Journey of a Form Submission)

When a patient clicks **"Book My Free Counselling"**, the following happens in sequence:

```
Patient submits form
       │
       ▼
① Saved to Supabase (our database) — instant backup
       │
       ▼
② Sent to Zoho CRM — appears as a new Lead for the sales team
       │
       ▼
③ Meta "Lead" event fired — tells Facebook/Instagram an ad lead was captured
       │
       ▼
④ Patient is redirected to /thank-you page
       │
       ▼
⑤ Meta "CompleteRegistration" event fired on thank-you page
```

---

## 4. Ad Tracking & Conversions (Meta / Facebook)

We run three types of conversion tracking for Meta ads:

### 4a. Browser Pixel (Client-Side)

| Event | When it fires | What it tells Meta |
|-------|--------------|-------------------|
| `PageView` | Every page load | Someone visited the site |
| `Lead` | Form submitted | A lead was captured (value: ₹500) |
| `CompleteRegistration` | Thank-you page loaded | Lead completed registration (value: ₹500) |

### 4b. Meta Conversions API — Offline Conversion (Server-Side)
This is a **second, more powerful layer** of tracking. When a lead is converted to a patient inside Zoho CRM, Zoho triggers our server which sends a `Purchase` event directly to Meta's servers.

**Event sent:** `Purchase` (Patient Converted) · Currency: INR

### 4c. UTM Parameters
Every ad campaign uses URL parameters to track performance:

| Parameter | Example | Purpose |
|-----------|---------|---------|
| `utm_source` | `facebook` | Which platform |
| `utm_medium` | `cpc` | Type of traffic |
| `utm_campaign` | `siliguri_diabetes_june` | Campaign name |

These are automatically captured from the URL and saved to Zoho with each lead.

---

## 5. Google Tag Manager (GTM)

**GTM ID: `GTM-PV54K5T5`**

Google Tag Manager is a container that loads first, before everything else on the page. It manages all other tracking scripts (Meta Pixel, Google Analytics, etc.) in one place. If we ever need to add a new tracking pixel or change tracking logic, we do it inside GTM — no code changes needed on the website.

---

## 6. Language / Translation System

The website supports **3 languages**:

- **English**
- **Hindi**
- **Bengali**

Language is also saved in the URL (e.g. `?lang=hi`, `?lang=bn`) so sharing the link keeps the language active.

---

## 7. Lead Flow Summary (From Ad Click to Zoho)

```
Facebook/Instagram Ad
        │  (click — UTM params in URL)
        ▼
Landing Page (/?utm_source=facebook&utm_campaign=...)
        │  (visitor scrolls, reads, watches videos)
        ▼
Clicks "Book Free Counselling"
        │
        ▼
/book-appointment?phone=XXXXXXXXXX  ← phone pre-filled if from ad
        │  (fills name, city, diabetic status, service)
        ▼
Form Submit
        │
        ├──► Supabase DB (appointments table) ← backup
        ├──► Zoho CRM (new Lead with UTM data)
        ├──► Meta Pixel "Lead" event (₹500 value)
        │
        ▼
/thank-you?ph=...&fn=...&ct=...
        │
        └──► Meta Pixel "CompleteRegistration" event
```

---
