# O'yin Qo'llanmasi (Guide)

Ushbu qo'llanma savollarni o'zgartirish va o'yinni serverga (GitHub) yuklash bo'yicha ma'lumot beradi.

## 1. Savollarni O'zgartirish (`public/questions.json`)

Savollar `public/questions.json` faylida joylashgan. Har bir sinf uchun alohida savollar to'plami mavjud.

**Struktura:**
- `id`: Savolning tartib raqami.
- `text`: Savol matni.
- `options`: 4 ta javob varianti (massiv ko'rinishida).
- `correctAnswer`: To'g'ri javobning indeksi (**0 dan boshlanadi**). 
  - Agar 1-javob to'g'ri bo'lsa: `0`
  - Agar 2-javob to'g'ri bo'lsa: `1` ... va hokazo.

**Misol:**
```json
{
    "id": 1,
    "text": "Sizning savolingiz matni?",
    "options": ["Variant 1", "Variant 2", "Variant 3", "Variant 4"],
    "correctAnswer": 0
}
```

## 2. GitHub-ga Yuklash va Sayt Sifatida Ishlatish

O'yinni hamma ko'rishi va ishlatishi uchun eng oson yo'l - **GitHub Pages** dan foydalanish.

### GitHub-ga Yuklash Bosqichlari:
1. [GitHub](https://github.com/)-da yangi repozitoriy (Repository) oching (masalan: `history-quiz-game`).
2. Kompyuteringizda terminalni oching va quyidagi buyruqlarni bajaring:
   ```bash
   git init
   git add .
   git commit -m "birinchi yuklash"
   git branch -M main
   git remote add origin https://github.com/FOYDALANUVCHI_NOMI/history-quiz-game.git
   git push -u origin main
   ```

### Vercel yoki Netlify orqali Deployment (Tavsiya qilinadi):
GitHub Pages-ga qaraganda **Vercel** (`vercel.com`) yoki **Netlify** (`netlify.com`) ishlatish ancha oson (avtomatik Build qiladi).
1. Vercel-ga kiring va GitHub hisobingiz bilan ro'yxatdan o'ting.
2. "Add New Project" tugmasini bosing va GitHub-dagi repozitoriyingizni tanlang.
3. "Deploy" tugmasini bosing. 
4. Vercel sizga tayyor havola (URL) beradi (masalan: `https://history-quiz-game.vercel.app`).

**Katta ekranda ishlatish:**
- O'sha URL manzilini katta ekrandagi brauzerda oching.
- Brauzerni Fullscreen (F11) rejimiga o'tkazing.
- O'yin ichidagi "Fullscreen" tugmasidan ham foydalanishingiz mumkin.

## 💡 Maslahatlar
- Savollarni JSON faylida o'zgartirgandan so'ng, o'yinni qayta yuklashingiz (push qilishingiz) kerak.
- O'yin doimiy ravishda `public/questions.json` dan ma'lumotlarni o'qiydi.
