import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    EN: {
        translation: {
            bismillah: "In the name of Allah",
            since_operating: "Since 2024 Operating In The World",
            institute_description: "After School Maktab Online Institute is not just a name but a platform where students of knowledge will grow under the shade of Ilm and Amal.",
            online_courses: "Online Islamic Courses",
            online_tutors: "Online Quran Tutors",
            home: "Home",
            courses: "Courses",
            library: "Our Library",
            about: "About Us",
            teachers: "Our Teachers",
            contact: "Contact",
            sunrise: "Sunrise",
            sunset: "Sunset",
            hotline: "Hotline",
            language: "Language",
            loading: "Loading...",
            close: "Close",
            courseCategory1: "One To One Courses",
            courseCategory2: "Batch Courses",
            seeDetails: "See Details",
            "ourLibrary": {
                "title": "Our Library",
                "subTitle": "Explore Our Digital Library"
            },
            "afterSchool": {
                "subTitle": "Welcome To The After School Maktab",
                "title": "Institute Focuses on Quality Islamic Education"
            },
            "fCourses": {
                "subTitle": "Welcome To The After School Maktab",
                "title": "Our featured Islamic Courses"
            },
            "rStudents": {
                "subTitle": "Our Students",
                "title": "Some Of Our Recent Student"
            },
            "outTutors": {
                "subTitle": "10 Experienced Islamic Teachers",
                "title": "Meet Our Teachers"
            },
            "allCourses": {
                "title": "Our All Courses",
                "subTitle": "Our All Courses"

            },
            "testimonials": {
                "title": "Testimonial",
                "subTitle": "What Our Students and Guardians Says"
            },
            aboutUs: {
                title: 'About Us',
                subTitle: 'Empowering Lives with Islamic Knowledge',
                article: {
                    introduction: {
                        title: 'Our Introduction',
                        text:
                            'Allah Subhanahu Wa Ta\'ala revealed in the Holy Quran: <br />' +
                            '<span class="font-bold">"Read in the name of your Lord who created."</span> (Surah Al-Alaq, Ayah 1)<br />' +
                            'By emphasizing "Read" first, Allah has highlighted the importance of acquiring knowledge in Islam. ' +
                            'The Prophet (peace be upon him) said: "Seeking (religious) knowledge is obligatory upon every Muslim man and woman." (Sunan Ibn Majah: 224)<br />' +
                            'In essence, it is essential for every Muslim to acquire sufficient Islamic knowledge to distinguish between halal and haram, enabling them to live a righteous life. ' +
                            'Ignorance can lead to deprivation of essential religious education, which is detrimental to our spiritual growth.<br />' +
                            'However, in today\'s busy lifestyle, many are unable to access religious education. ' +
                            'To address this gap, After School Maktab Online Institute was established to provide easy and guided online Islamic education, allowing you or your loved ones to learn from the comfort of home.'
                    },
                    goals: {
                        title: 'Our Goals',
                        text:
                            'Our goal is to ensure that students, children, adults, professionals, and homemakers can access Islamic knowledge at their convenience. ' +
                            'We aim for After School Maktab Online Institute to be a platform where lives are illuminated by the Quran and Sunnah, fostering a generation that is religiously aware and morally sound, paving the way for a brighter future.'
                    },
                    programs: {
                        title: 'Our Educational Programs',
                        text: 'We offer progressive Islamic education courses for children, teenagers, young adults, and adults. Our ongoing and upcoming courses include:',
                        courses: [
                            'Correct Quranic recitation through Noorani Qaida and related subjects',
                            'Nazeratul Quran (Learning to recite the Quran by sight)',
                            'Hifzul Quran (Memorizing the entire Quran)',
                            'Memorization of selected Quranic Surahs',
                            'Memorization of the 30th Juz (Amma Para)',
                            'Arabic language course',
                            'Productive Ramadan',
                            'Seerah (Life of the Prophet)',
                            'Tafsirul Quran Dars',
                            'Diploma in Islamic Studies',
                            'Seerah and Aqidah for Kids',
                            'Du\'a and Aqidah for Kids',
                            'Azkaar, Du’a, and Masnoon Amal education',
                            'Aqaid, Adab, and Salah education for children',
                            'At-Ta\'allum Minal Hadith (Learning from Hadith - Basic and Primary Level)',
                            'Daily Mas\'ala-Masayel (Separate classes for men and women)',
                            'Adab and Akhlaq (Character-building lessons)',
                            'Biographies of Prophets and Islamic History'
                        ]
                    },
                    whyChooseUs: {
                        title: 'Why Choose Us?',
                        points: [
                            'Our institute is run by skilled, talented, qualified, and experienced teachers.',
                            'Separate male and female instructors for boys and girls.',
                            'We are highly punctual and offer flexible schedules.',
                            'Focused guidance during lessons.',
                            'Regular communication with parents, transparent management, and consistent evaluation and reporting systems.'
                        ]
                    },
                    vision: {
                        title: 'Our Vision',
                        text:
                            'After School Maktab Online Institute is not just a name but a platform where students of knowledge will grow under the shade of Ilm and Amal. ' +
                            'They will learn, understand, and cherish Allah’s words and the Sunnah of the Prophet (peace be upon him), spreading this light worldwide.'
                    }
                }
            },
            homeBanner: {
                backgroundAlt: 'Islamic Background',
                typeAnimation: {
                    first: 'We Ensure Islamic Values',
                    second: 'We Ensure Classified Scholars',
                },
                description:
                    'After School Maktab Online Institute Every Evening, Enlightened by Religious Knowledge',
                exploreButton: 'Explore Courses',
                studentImageAlt: 'Students',
            },
            "chooseUs": {
                "title": "Why Choose Our Islamic Institute",
                "description": "Your religious education, our responsibility. Religious education made easy and accurate. After School Maktab Online Institute is here for you",
                "statStudents": "Students",
                "cards": {
                    "onlinePrograms": {
                        "title": "Online Academics Programs",
                        "description": "Our institute is run by experienced teachers who provide separate instruction for boys and girls with flexible schedules."
                    },
                    "learnBooks": {
                        "title": "Learn Islamic Books",
                        "description": "Our online programs are designed to meet each student's unique needs with personalized learning experiences."
                    },
                    "quranClasses": {
                        "title": "Online Quran Classes",
                        "description": "Our Quran classes provide deep, personalized learning with proper guidance and flexibility for spiritual growth."
                    },
                    "valueStudents": {
                        "title": "We Value Our Students",
                        "description": "We prioritize students' development with dedicated attention and a supportive environment for success."
                    }
                }
            }
        },

    },

    BN: {
        translation: {
            bismillah: "বিসমিল্লাহির রাহমানির রাহীম",
            since_operating: "২০২৪ সাল থেকে বিশ্বব্যাপী পরিচালিত হচ্ছে",
            institute_description: "After School Maktab Online Institute শুধু একটি নাম নয়, বরং একটি প্ল্যাটফর্ম যেখানে ঝাঁকে ঝাঁকে ত্বালিবে ইলম গড়ে উঠবে ইলম ও আ'মালের ছায়ায়।",
            online_courses: "অনলাইন ইসলামিক কোর্স",
            online_tutors: "অনলাইন কুরআন শিক্ষক",
            home: "হোম",
            courses: "কোর্সসমূহ",
            library: "আমাদের লাইব্রেরি",
            about: "আমাদের সম্পর্কে",
            teachers: "আমাদের শিক্ষক",
            contact: "যোগাযোগ",
            sunrise: "সূর্যোদয়",
            sunset: "সূর্যাস্ত",
            hotline: "হটলাইন",
            language: "ভাষা",
            loading: "লোড হচ্ছে...",
            close: "বন্ধ করুন",
            courseCategory1: "ওয়ান টু ওয়ান কোর্সসমূহ",
            courseCategory2: "ব্যাচ কোর্সসমূহ",
            seeDetails: "বিস্তারিত দেখুন",
            "ourLibrary": {
                "title": "আমাদের লাইব্রেরি",
                "subTitle": "আমাদের লাইব্রেরি "
            },
            "afterSchool": {
                "subTitle": "আফটার স্কুল মক্তবে আপনাকে স্বাগতম",
                "title": "প্রতিষ্ঠান মানসম্মত ইসলামী শিক্ষার উপর গুরুত্ব দেয়"

            },
            "fCourses": {
                "subTitle": "আফটার স্কুল মক্তবে আপনাকে স্বাগতম",
                "title": "আমাদের নির্বাচিত ইসলামী কোর্সসমূহ"
            },
            "rStudents": {
                "subTitle": "আমাদের ছাত্ররা",
                "title": "আমাদের সাম্প্রতিক এডমিশন নেয়া কিছু ছাত্র"
            },
            "outTutors": {
                "subTitle": "১ জন অভিজ্ঞ ইসলামী শিক্ষক",
                "title": "আমাদের শিক্ষকদের"
            },
            "allCourses": {
                "title": "আমাদের সকল কোর্স",
                "subTitle": "আমাদের সকল কোর্স"
            },
            "testimonials": {
                "title": "আমাদের স্টুডেন্টদের মতামত",
                "subTitle": "আমাদের স্টুডেন্ট এবং অভিভাবকদের অভিমতnpm "
            },
            aboutUs: {
                title: 'আমাদের পরিচিতি',
                subTitle: 'ইসলামী জ্ঞান দিয়ে জীবনকে আলোকিত করা',
                article: {
                    introduction: {
                        title: 'আমাদের পরিচিতি',
                        text:
                            'আল্লাহ সুবহানাহু ওয়া তায়ালা কুরআনুল কারিম নাযিল করে সর্বপ্রথম নির্দেশ করেছেন-<br />' +
                            '<span class="font-bold">اقرأ باسم ربّك الذّي خلق.</span><br />' +
                            'অর্থ: "পড়ুন আপনার প্রতিপালকের নামে যিনি সৃষ্টি করেছেন" (সূরাতুল আলাক, আয়াত ০১)<br />' +
                            'সর্বপ্রথম \'পড়\' তথা জ্ঞান অর্জনের কথা উল্লেখ করে আল্লাহ সুবহানাহু ওয়া তাআলা ইসলামে এর গুরুত্ব নির্দেশ করেছেন। ' +
                            'নবী করিম সা: বলেছেন - প্রত্যেক মুসলিম নারী ও পুরুষের উপর (দ্বীনি) \'ইলম\' অন্বেষণ করা ফরজ। (হাদীস সুনানু ইবনে মাজাহ: ২২৪)<br />' +
                            'মোট কথা একজন মুসলিম নারী পুরুষের উপর ততটুকু ইসলামী জ্ঞান অর্জন করা আবশ্যক যতটুকু জ্ঞান অর্জন করলে একজন মুমিন হালাল এবং হারাম থেকে বেঁচে থাকতে পারেন। ' +
                            'সুতরাং অজ্ঞতাবশত প্রয়োজনীয় দ্বীনি শিক্ষা থেকে বঞ্চিত বা বিমুখ থাকা আমাদের জন্যই ক্ষতি বয়ে আনবে।<br />' +
                            'তবে বর্তমান ব্যস্ত জীবনযাত্রায় অনেকেই দ্বীনি শিক্ষার সুযোগ থেকে বঞ্চিত হচ্ছেন। ' +
                            'এই অভাব পূরণের লক্ষ্যে After School Maktab Online Institute উদ্ভাবন করেছে- অনলাইনে সহজ ও গাইডেড দ্বীনি শিক্ষা; যেন আপনি বা আপনার প্রিয়জন ঘরে বসেই খুব সহজে দ্বীনি ইলম অর্জন করতে পারেন।'
                    },
                    goals: {
                        title: 'আমাদের লক্ষ্য',
                        text:
                            'আমাদের লক্ষ্য হল— একজন ছাত্র-ছাত্রী, ছোট, বড়, কর্মজীবী বা গৃহিণী—সকলেই তাদের সুবিধামত সময়ে ইসলামী জ্ঞান আহরণের সুযোগ পান। ' +
                            'আমরা চাই After School Maktab Online Institute এমন একটি মাধ্যম হোক যার মাধ্যমে আপনার জীবন কুরআন সুন্নাহর আলোয় আলোকিত হবে; এবং দ্বীনি বোধ সম্পন্ন একটি সুস্থ ও সচেতন প্রজন্ম গড়ে উঠবে; যাদের হাত ধরে রচিত হবে একটি আলোকিত ভবিষ্যত!'
                    },
                    programs: {
                        title: 'আমাদের শিক্ষা কার্যক্রম',
                        text: 'আমরা শিশু, কিশোর, উঠতি বয়সী ছেলে অথবা মেয়ে, এবং প্রাপ্তবয়স্কদের জন্য পর্যায়ক্রমিক দ্বীনি শিক্ষা কোর্স পরিচালনা করে আসছি। আমাদের চলমান ও আসন্ন কোর্স সমূহ:',
                        courses: [
                            'নূরানী কায়দা ও আনুষঙ্গিক বিষয় পাঠদানের মাধ্যমে সহীহ ভাবে কুরআন তিলাওয়াত শিক্ষা',
                            'নাজেরাতুল কুরআন (দেখে কুরআনুল কারিমের তেলাওয়াত শেখা)',
                            'হিফজুল কুরআন (সম্পূর্ণ কুরআনুল কারিম মুখস্থ করা)',
                            'কুরআনুল কারিমের বিশেষ সূরা হিফজ',
                            'কুরআনুল কারিমের ৩০ নং পারা (আম্মা পারা) হিফজ',
                            'আরবী ভাষা কোর্স',
                            'প্রোডাক্টিভ রমাদান',
                            'নবী জীবন (সিরাহ)',
                            'তাফসিরুল কুরআন দারস্',
                            'ডিপ্লোমা ইন ইসলামীক স্টাডিজ',
                            'সিরাহ এন্ড আকিদা ফর কিডস',
                            'দু\'আ এন্ড আকিদা ফর কিডস',
                            'আযকার, দোআ ও মাসনূন আ\'মাল শিক্ষা',
                            'ছোটদের জন্য আকাইদ, আদব, সালাত শিক্ষা',
                            'আত তা\'আল্লুম মিনাল হাদীছ (হাদীস থেকে শিক্ষা- প্রাথমিক ও বেসিক স্তর)',
                            'দৈনন্দিন মাসআলা-মাসায়েল (পুরুষ ও নারীদের জন্য আলাদা ক্লাস)',
                            'আদব ও আখলাক (চরিত্র)- গঠনমূলক পাঠ',
                            'নবীদের জীবনী ও ইসলামি ইতিহাস'
                        ]
                    },
                    whyChooseUs: {
                        title: 'কেন আমাদের নির্বাচন করবেন?',
                        points: [
                            'আমরা দক্ষ, মেধাবী, যোগ্য ও অভিজ্ঞ শিক্ষক-শিক্ষিকা দ্বারা আমাদের ইন্সটিটিউট পরিচালনা করে থাকি।',
                            'ছেলে-মেয়ে আলাদা শিক্ষক/শিক্ষিকা দ্বারা ক্লাস করানো হয়।',
                            'আমরা সময়ের প্রতি অধিক যত্নশীল ও সময়ানুবর্তী; এছাড়াও আমাদের রয়েছে নির্দিষ্ট ও নমনীয় সময়সূচি।',
                            'দারস্ পিরিয়ডে আমরা একাগ্র গাইডিং মেন্টেইন করে থাকি।',
                            'অভিভাবক/পিতা-মাতার সঙ্গে নিয়মিত যোগাযোগ ও স্বচ্ছ ম্যানেজমেন্ট; নিয়মিত মূল্যায়ন ও রিপোর্টিং সিস্টেমে আমাদের সকল কার্যক্রম পরিচালনা করা হয়।'
                        ]
                    },
                    vision: {
                        title: 'আমাদের স্বপ্ন',
                        text:
                            'After School Maktab Online Institute শুধু একটি নাম নয়, বরং একটি প্ল্যাটফর্ম যেখানে ঝাঁকে ঝাঁকে ত্বালিবে ইলম গড়ে উঠবে ইলম ও আ\'মালের ছায়ায়। ' +
                            'যারা আল্লাহর কালাম ও রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লামের সুন্নাহ জানবে, বুঝবে এবং তা হৃদয়ে লালন করবে; এবং সেই আলো ছড়িয়ে দেবে বিশ্বময়!'
                    }
                }
            },
            homeBanner: {
                backgroundAlt: 'ইসলামী পটভূমি',
                typeAnimation: {
                    first: 'আমরা ইসলামী মূল্যবোধ নিশ্চিত করি',
                    second: 'আমরা যোগ্য আলেমদের নিশ্চিত করি',
                },
                description:
                    'আফটার স্কুল মাকতাব অনলাইন ইনস্টিটিউট প্রতি সন্ধ্যায়, ধর্মীয় জ্ঞানে আলোকিত',
                exploreButton: 'আমাদের কোর্সগুলি',
                studentImageAlt: 'ছাত্রছাত্রী',
            },
            "chooseUs": {
                "title": "কেন আমাদের ইনস্টিটিউটটি নির্বাচন করবেন",
                "description": "আপনার ধর্মীয় শিক্ষা, আমাদের দায়িত্ব। ধর্মীয় শিক্ষাকে সহজ এবং নির্ভুল করে তোলা। আফটার স্কুল মক্তব অনলাইন ইনস্টিটিউট আপনার জন্য এখানেই রয়েছে",
                "statStudents": "শিক্ষার্থী",
                "cards": {
                    "onlinePrograms": {
                        "title": "অনলাইন একাডেমিক প্রোগ্রাম",
                        "description": "আমাদের ইনস্টিটিউট অভিজ্ঞ শিক্ষকদের দ্বারা পরিচালিত হয় যারা নমনীয় সময়সূচী সহ ছেলে এবং মেয়েদের জন্য পৃথক নির্দেশনা প্রদান করে।"
                    },
                    "learnBooks": {
                        "title": "ইসলামিক বই শিখুন",
                        "description": "আমাদের অনলাইন প্রোগ্রামগুলি ব্যক্তিগতকৃত শিক্ষার অভিজ্ঞতার সাথে প্রতিটি শিক্ষার্থীর অনন্য প্রয়োজন মেটাতে ডিজাইন করা হয়েছে।"
                    },
                    "quranClasses": {
                        "title": "অনলাইন কুরআন ক্লাস",
                        "description": "আমাদের কুরআন ক্লাসগুলি আধ্যাত্মিক বিকাশের জন্য যথাযথ নির্দেশনা এবং নমনীয়তার সাথে গভীর, ব্যক্তিগতকৃত শিক্ষা প্রদান করে।"
                    },
                    "valueStudents": {
                        "title": "আমরা আমাদের শিক্ষার্থীদের মূল্য দিই",
                        "description": "আমরা সফলতার জন্য একটি সহায়ক পরিবেশ এবং নিবেদিত মনোযোগ সহ শিক্ষার্থীদের বিকাশকে অগ্রাধিকার দিই।"
                    }
                }
            }


        },
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("lang") || "EN",
    fallbackLng: "EN",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
