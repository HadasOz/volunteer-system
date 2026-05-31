# Volunteer System API 🚀

## תיאור הפרויקט
מערכת ניהול בקשות עזרה ומתנדבים המאפשרת תיאום יעיל בין אנשים הזקוקים לסיוע לבין מתנדבים המוכנים לעזור.

המערכת בנויה כ-REST API מלא עם ממשק ניהול, תיעוד אוטומטי, ואוסף בדיקות מוכן ב-Postman.

---


## 📁 מבנה הפרויקט
```
volunteer-system/
│
├── config/                    # קבצי תצורה
│   ├── database.js           # חיבור למסד נתונים
│   ├── routes.js             # ניתוב ראשי
│   └── swagger.js            # תצורת Swagger
│
├── src/
│   ├── controllers/          # בקרים - טיפול בבקשות HTTP
│   │   ├── RequestController.js
│   │   └── VolunteerController.js
│   │
│   ├── bl-services/          # לוגיקה עסקית
│   │   ├── RequestService.js
│   │   └── VolunteerService.js
│   │
│   ├── dal-models/           # מודלים - סכמות Mongoose
│   │   ├── Volunteer.js
│   │   └── VolunteerRequest.js
│   │
│   └── routes/               # ניתוב API
│       ├── volunteers.js
│       └── requests.js
│
├── public/                   # ממשק משתמש HTML
│   └── index.html
│
├── seedData.js              # נתונים ראשוניים
├── index.js                 # נקודת כניסה ראשית
├── .env                     # משתני סביבה
├── package.json             # תלויות
└── README.md               # המדריך הזה
```

---

## 🚀 התקנה והפעלה

### **דרישות מקדימות:**
- Node.js (גרסה 18 ומעלה)
- MongoDB (מותקן מקומית או Atlas)

### **שלב 1: התקנת תלויות**
```bash
npm install
```

### **שלב 2: הגדרת משתני סביבה**
צור קובץ `.env` עם הפרמטרים הבאים:
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/volunteer_system
```

### **שלב 3: טעינת נתונים ראשוניים**
```bash
npm run seed
```

תראה פלט כזה:
```
🔄 מתחבר למסד הנתונים...
✅ התחברות הצליחה!
🗑️  מנקה נתונים ישנים...
✅ ניקוי הושלם!
👥 יוצר מתנדבים...
✅ נוצרו 5 מתנדבים!
📋 יוצר בקשות עזרה...
✅ נוצרו 10 בקשות עזרה!
🎉 סיימנו!
```

### **שלב 4: הפעלת השרת**
```bash
npm start
```

השרת ירוץ על: `http://localhost:3000`

---

## 📚 גישה למערכת

### **1. ממשק משתמש HTML**
```
http://localhost:3000
```
ממשק מלא לניהול בקשות ומתנדבים

### **2. תיעוד Swagger**
```
http://localhost:3000/api-docs
```
תיעוד API אינטראקטיבי מלא

### **3. API Endpoints**
כל ה-endpoints זמינים תחת:
```
http://localhost:3000/api/...
```

---

## 🔌 רשימת API Endpoints

### **👥 Volunteers (מתנדבים)**

| Method | Endpoint | תיאור |
|--------|----------|-------|
| `POST` | `/api/volunteers` | יצירת מתנדב חדש |
| `GET` | `/api/volunteers` | קבלת כל המתנדבים |

#### **דוגמה ליצירת מתנדב:**
```bash
POST http://localhost:3000/api/volunteers
Content-Type: application/json

{
  "firstName": "דוד",
  "lastName": "כהן",
  "phone": "050-1234567",
  "skills": ["גרירה", "חילוץ", "מכניקה"]
}
```

---

### **📋 Requests (בקשות עזרה)**

| Method | Endpoint | תיאור |
|--------|----------|-------|
| `GET` | `/api/requests` | קבלת כל הבקשות |
| `GET` | `/api/requests?status=ממתין` | סינון לפי סטטוס |
| `GET` | `/api/requests?priority=גבוהה` | סינון לפי עדיפות |
| `GET` | `/api/requests?location=תל אביב` | סינון לפי מיקום (חלקי) |
| `GET` | `/api/requests/:id` | קבלת בקשה לפי ID |
| `POST` | `/api/requests` | יצירת בקשה חדשה |
| `PATCH` | `/api/requests/:id` | עדכון חלקי של בקשה |
| `DELETE` | `/api/requests/:id` | מחיקת בקשה |
| `POST` | `/api/requests/:id/volunteer` | שיוך מתנדב לבקשה |
| `PATCH` | `/api/requests/:id/status` | עדכון סטטוס בקשה |
| `PATCH` | `/api/requests/:id/unassign` | ביטול שיוך מתנדב |

#### **דוגמה ליצירת בקשה:**
```bash
POST http://localhost:3000/api/requests
Content-Type: application/json

{
  "location": "תל אביב - רחוב דיזנגוף 50",
  "description": "רכב תקוע בשלג, דרושה גרירה",
  "phone": "050-1234567",
  "peopleCount": 2,
  "priority": "גבוהה"
}
```

#### **דוגמה לשיוך מתנדב:**
```bash
POST http://localhost:3000/api/requests/679abc123def456789/volunteer
Content-Type: application/json

{
  "volunteerId": "679xyz987fed654321"
}
```

---

## 🧪 בדיקות עם Postman

### **ייבוא ה-Collection:**

1. פתח את Postman
2. לחץ על **Import**
3. בחר את הקובץ: `Volunteer_System.postman_collection.json`
4. לחץ **Import**

### **בקשות מוכנות ב-Collection:**

✅ **Create Volunteer** - יצירת מתנדב חדש  
✅ **Get All Volunteers** - קבלת כל המתנדבים  
✅ **Create Request** - יצירת בקשה חדשה  
✅ **Get All Requests** - קבלת כל הבקשות  
✅ **Filter by Status** - סינון לפי סטטוס  
✅ **Filter by Priority** - סינון לפי עדיפות  
✅ **Filter by Location** - סינון לפי מיקום  
✅ **Assign Volunteer** - שיוך מתנדב לבקשה  
✅ **Update Status** - עדכון סטטוס  
✅ **Unassign Volunteer** - ביטול שיוך  
✅ **Delete Request** - מחיקת בקשה  

---

## 📊 מודלים (Schemas)

### **Volunteer (מתנדב)**
```javascript
{
  firstName: String,      // שם פרטי (חובה)
  lastName: String,       // שם משפחה (חובה)
  phone: String,          // טלפון (חובה)
  skills: [String],       // רשימת התמחויות
  createdAt: Date,        // תאריך יצירה (אוטומטי)
  updatedAt: Date         // תאריך עדכון (אוטומטי)
}
```

### **VolunteerRequest (בקשת עזרה)**
```javascript
{
  location: String,                    // מיקום (חובה)
  description: String,                 // תיאור הבעיה (חובה)
  phone: String,                       // טלפון ליצירת קשר (חובה)
  peopleCount: Number,                 // מספר אנשים תקועים (חובה)
  priority: String,                    // עדיפות: נמוכה/בינונית/גבוהה/קריטית (חובה)
  status: String,                      // סטטוס: ממתין/בטיפול/טופל (ברירת מחדל: ממתין)
  volunteer: ObjectId (ref: Volunteer), // מתנדב משויך (אופציונלי)
  createdAt: Date,                     // תאריך יצירה (אוטומטי)
  updatedAt: Date                      // תאריך עדכון (אוטומטי)
}
```

---

## 🎯 תכונות מיוחדות

### **1. סינון חכם**
- סינון לפי מיקום משתמש ב-regex ותומך בחיפוש חלקי
- ניתן לשלב מספר פילטרים (status + priority + location)

### **2. ניהול סטטוסים אוטומטי**
- כאשר מתנדב משוייך לבקשה, הסטטוס משתנה אוטומטית ל"בטיפול"
- כאשר מבטלים שיוך, הסטטוס חוזר ל"ממתין"

### **3. Validation מובנה**
- בדיקת שדות חובה
- בדיקת enum (סטטוס ועדיפות)
- בדיקת ObjectId תקין

### **4. Populate אוטומטי**
- פרטי המתנדב מוצגים במלואם בבקשות (לא רק ה-ID)

---

## 📦 Scripts זמינים
```json
{
  "start": "node index.js",        // הפעלת השרת
  "seed": "node seedData.js"       // טעינת נתונים ראשוניים
}
```

---

## 🗃️ נתונים ראשוניים (Seed Data)

הסקריפט `npm run seed` יוצר:

### **5 מתנדבים:**
- דוד כהן - גרירה, חילוץ, תיקון מכוניות
- שרה לוי - עזרה ראשונה, תמיכה נפשית, סיעוד
- משה אברהם - מנעולן, חשמלאי, אינסטלטור
- רחל ישראלי - נהיגה, חילוץ, הובלה
- יוסי מזרחי - גרירה, מכניקה, נעילת גלגלים

### **10 בקשות עזרה:**
- 4 בסטטוס "ממתין"
- 2 בסטטוס "בטיפול"
- 4 בסטטוס "טופל"
- מגוון עדיפויות ומיקומים ברחבי הארץ

---

## 🏗️ ארכיטקטורה - שכבות

### **1. Routes Layer (שכבת ניתוב)**
- מקבלת בקשות HTTP
- מעבירה ל-Controllers
- מטפלת ב-Middleware (validation, authentication עתידי)

### **2. Controllers Layer (שכבת בקרים)**
- מטפלת בלוגיקת HTTP (status codes, responses)
- מבצעת validation בסיסי
- קוראת ל-Services

### **3. Services Layer (שכבת לוגיקה עסקית)**
- מכילה את הלוגיקה העסקית
- מבצעת פעולות על הנתונים
- מתקשרת עם ה-DAL

### **4. DAL Layer (Data Access Layer)**
- מודלים של Mongoose
- אינטראקציה ישירה עם MongoDB
- הגדרות Schema וקשרים

---


### **Port 3000 תפוס**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**פתרון:** שנה את ה-PORT ב-`.env` או עצור את התהליך הקיים

### **נתונים לא מופיעים**
**פתרון:** הרץ את `npm run seed` שוב



## 👨‍💻 מחבר

**[הדס ואיילת]**  
פרויקט Node.js - מערכת ניהול מתנדבים  
תשפ"ו

---


**🎉 הפרויקט מוכן להרצה! בהצלחה! 🚀**

 Swagger: http://localhost:3000/api-docs
- UI: http://localhost:3000
