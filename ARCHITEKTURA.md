# Architektúra — STK Web 2026

**Status:** draft, dopĺňa sa vo Fáze 2

## Routing

| Path | Typ | Účel |
|---|---|---|
| `/` | Astro static | Landing — hero, USP, CTA na objednávku |
| `/sluzby` | Astro static | Prehľad služieb (TK, EK, KO, tachografy, ADR, CEMT, extra) |
| `/sluzby/[slug]` | Astro dynamic | Detail služby (cenník + popis + CTA) |
| `/cennik` | Astro static | Plný cenník 2026 |
| `/clanky` | Astro static | Blog index |
| `/clanky/[slug]` | Astro content collection | Blog post (Markdown) |
| `/uzitocne-informacie` | Astro static | FAQ + tipy |
| `/objednavka` | Astro + React island | Chat wizard (11 krokov) |
| `/o-nas` | Astro static | About + Optimus Prime + Fúzik |
| `/kontakt` | Astro static | Mapa, hodiny, telefón, email |
| `admin.easycheck.sk` | React SPA (subdomain) | PIN-protected admin kalendár + reporting |

## Supabase schema (návrh)

```sql
-- Services
services (id, slug, name_sk, category, base_price_eur, duration_min, description, active)

-- Vehicle categories
vehicle_categories (id, slug, name_sk, axle_count, max_weight_kg)

-- Service ↔ vehicle category matrix (price per category)
service_pricing (service_id, vehicle_category_id, price_eur, duration_min)

-- Technicians
technicians (id, full_name, role, active)

-- Service capabilities (kto čo môže robiť)
technician_services (technician_id, service_id)

-- Working hours (per technician, weekly schedule)
working_hours (id, technician_id, weekday, start_time, end_time)

-- Blackout dates (dovolenky, sviatky)
blackout_dates (id, technician_id, date_from, date_to, reason)

-- Bookings
bookings (id, public_id, status, customer_name, phone, email, license_plate,
          vehicle_brand, vehicle_model, vehicle_year, service_ids[], technician_id,
          scheduled_at, duration_min, total_price_eur, pickup_service,
          pickup_address, notes, created_at)

-- Blog posts (alternatíva: Markdown files v repo)
blog_posts (id, slug, title, excerpt, content_md, hero_image, published_at,
            author, tags[], legacy_wp_url)
```

## Admin auth

**Decision pending:** PIN ako report-app vs Supabase Auth + magic link.

Predbežný favorit: **PIN per role** (owner / manager / technician) cez Supabase RLS — konzistentné s existujúcou report-app architektúrou.

## Email flow (po launchi)

1. Booking confirm — okamžite po `/objednavka` finish
2. Reminder — 24h pred termínom (Supabase cron)
3. STK koniec platnosti — 30 dní pred (Supabase cron + bookings history)

## SEO baseline

- Sitemap auto-generated cez `@astrojs/sitemap`
- robots.txt allow all
- Schema.org `LocalBusiness` na `/` + `Service` na `/sluzby/[slug]` + `Article` na `/clanky/[slug]`
- 301 redirect mapa z WordPress URLs → nové (vo Fáze 4)

## Open questions

- Markdown blog vs Supabase CMS — default: Markdown
- Akú knižnicu na kalendár v admine — FullCalendar vs custom
- Pickup servis: cena dynamicky podľa vzdialenosti (Mapbox API?) alebo flat 15€
- GDPR cookie banner — vlastný alebo hotová (cookiebot)?
