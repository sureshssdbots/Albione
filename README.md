# Style Haven – Multi-File Project Structure

## Files Overview

| File | Description |
|------|-------------|
| `index.html` | 🏠 Home Page (Main Landing Page) |
| `collection.html` | 🛍️ Collection Page + Collection View |
| `product.html` | 👕 Product Detail Page |
| `checkout.html` | 💳 Checkout Page |
| `wishlist.html` | ♥ Wishlist Page |
| `login.html` | 🔐 Login + Register Pages |
| `profile.html` | 👤 User Profile Page |
| `admin.html` | ⚙️ Admin Panel |
| `pages.html` | 📄 Info Pages (About, FAQ, Shipping, etc.) |
| `shared-styles.css` | 🎨 Global CSS Styles (sab pages share karte hain) |
| `shared.js` | ⚡ All JavaScript Logic (sab pages share karte hain) |

## How It Works (Kaise Kaam Karta Hai)

- Har page ka apna HTML file hai
- **shared-styles.css** – ek hi CSS file hai jo sab pages use karte hain
- **shared.js** – ek hi JS file hai jisme sab functions hain (cart, firebase, products etc.)
- Navigation automatically page ke beech redirect karta hai

## Navigation Flow

```
index.html (Home)
    ↓ "Shop Collection" button
collection.html
    ↓ Product click
product.html
    ↓ "Add to Cart" → Checkout
checkout.html
    ↓ Login required
login.html → profile.html
```

## Starting the Project

Simply `index.html` ko browser mein open karo, ya kisi web server pe host karo.

**Firebase is already configured** – koi change ki zaroorat nahi.

## Important Notes

1. Sab files **ek hi folder** mein hone chahiye
2. `shared.js` aur `shared-styles.css` sab HTML files ke saath hone chahiye  
3. Browser mein direct open karne pe Firebase kaam karega (CORS configured hai)
