const mongoose = require('mongoose');
const Volunteer = require('./src/dal-models/Volunteer');
const VolunteerRequest = require('./src/dal-models/VolunteerRequest');
require('dotenv').config();

async function seedDatabase() {
  try {
    console.log('🔄 connect to the database..');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ connection complited!');
    
    // נקה נתונים קיימים
    console.log('🗑️  מנקה נתונים ישנים...');
    await Volunteer.deleteMany({});
    await VolunteerRequest.deleteMany({});
    console.log('✅ cleaning completed!');
    
    // צור מתנדבים
    console.log('👥 craeting volunteers..');
    const volunteers = await Volunteer.insertMany([
      {
        firstName: 'דוד',
        lastName: 'כהן',
        phone: '050-1234567',
        skills: ['גרירה', 'חילוץ', 'תיקון מכוניות']
      },
      {
        firstName: 'שרה',
        lastName: 'לוי',
        phone: '052-9876543',
        skills: ['עזרה ראשונה', 'תמיכה נפשית', 'סיעוד']
      },
      {
        firstName: 'משה',
        lastName: 'אברהם',
        phone: '054-5555555',
        skills: ['מנעולן', 'חשמלאי', 'אינסטלטור']
      },
      {
        firstName: 'רחל',
        lastName: 'ישראלי',
        phone: '053-1111222',
        skills: ['נהיגה', 'חילוץ', 'הובלה']
      },
      {
        firstName: 'יוסי',
        lastName: 'מזרחי',
        phone: '050-9998877',
        skills: ['גרירה', 'מכניקה', 'נעילת גלגלים']
      }
    ]);
    console.log(`✅ created ${volunteers.length} volunteers!`);
    
    // צור בקשות עזרה
    console.log('📋 creating VolunteerRequest..');
    const requests = await VolunteerRequest.insertMany([
      {
        location: 'תל אביב - רחוב דיזנגוף 50',
        description: 'רכב תקוע בשלג, דרושה גרירה דחופה. המנוע לא מתנע.',
        phone: '050-1111111',
        peopleCount: 2,
        priority: 'גבוהה',
        status: 'ממתין'
      },
      {
        location: 'ירושלים - כביש 1 ליד מוצא',
        description: 'משפחה תקועה בדרך, 3 ילדים קטנים. קר מאוד ואין חימום.',
        phone: '052-2222222',
        peopleCount: 5,
        priority: 'קריטית',
        status: 'ממתין'
      },
      {
        location: 'חיפה - שכונת הדר',
        description: 'צריך עזרה עם סוללה ריקה, הרכב לא מתניע',
        phone: '054-3333333',
        peopleCount: 1,
        priority: 'נמוכה',
        status: 'בטיפול',
        volunteer: volunteers[0]._id
      },
      {
        location: 'באר שבע - כביש 40',
        description: 'פנצ\'ר בגלגל, אין גלגל רזרבי',
        phone: '053-4444444',
        peopleCount: 3,
        priority: 'בינונית',
        status: 'ממתין'
      },
      {
        location: 'נתניה - דרך פוארה',
        description: 'רכב החליק לתעלה, צריך מנוף וגרירה',
        phone: '050-5555555',
        peopleCount: 2,
        priority: 'גבוהה',
        status: 'בטיפול',
        volunteer: volunteers[1]._id
      },
      {
        location: 'פתח תקווה - רחוב ז\'בוטינסקי',
        description: 'נעילת מפתחות ברכב, הילד בפנים',
        phone: '052-6666666',
        peopleCount: 1,
        priority: 'קריטית',
        status: 'ממתין'
      },
      {
        location: 'אשדוד - כביש החוף',
        description: 'בעיה במנוע, עולה עשן',
        phone: '054-7777777',
        peopleCount: 4,
        priority: 'גבוהה',
        status: 'טופל',
        volunteer: volunteers[2]._id
      },
      {
        location: 'רחובות - רחוב הרצל 25',
        description: 'צריך קפיצת סוללה',
        phone: '053-8888888',
        peopleCount: 1,
        priority: 'נמוכה',
        status: 'טופל',
        volunteer: volunteers[4]._id
      },
      {
        location: 'רמת גן - דרך בן גוריון',
        description: 'תקיעה בשלג, צריך עזרה דחופה',
        phone: '050-9999999',
        peopleCount: 2,
        priority: 'בינונית',
        status: 'ממתין'
      },
      {
        location: 'הרצליה - רחוב המדינה',
        description: 'רכב לא מתניע אחרי הלילה הקר',
        phone: '052-0000000',
        peopleCount: 1,
        priority: 'נמוכה',
        status: 'ממתין'
      }
    ]);
    console.log(`✅ created ${requests.length} VolunteerRequest!`);
    
    console.log('\n🎉 סיימנו! מסד הנתונים מוכן לשימוש!');
    console.log(`📊 סיכום:`);
    console.log(`   - ${volunteers.length} מתנדבים`);
    console.log(`   - ${requests.length} בקשות עזרה`);
    console.log(`   - ${requests.filter(r => r.status === 'ממתין').length} ממתינות`);
    console.log(`   - ${requests.filter(r => r.status === 'בטיפול').length} בטיפול`);
    console.log(`   - ${requests.filter(r => r.status === 'טופל').length} טופלו`);
    
    await mongoose.connection.close();
    console.log('🔌 החיבור למסד נתונים נסגר');
    process.exit(0);
  } catch (err) {
    console.error('❌ שגיאה ביצירת הנתונים:', err);
    process.exit(1);
  }
}

seedDatabase();