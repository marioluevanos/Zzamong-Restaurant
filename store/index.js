export const state = () => ({
    pages: [],
    activeId: ''
})

export const mutations = {
    SET_PAGES (state, pages) {
        state.pages = pages
    },
    SET_SECTION_ID (state, id) {
        state.activeId = id
    }
}

export const getters = {
    home: state => state.pages.find(page => page.id === 'home') || {
        image: require('@/assets/images/bg-noodles.jpg'),
        title: 'Best Korean-Chinese Food in LA',
        subtext: 'To Go & Free Delivery',
        button1Text: 'Order Now',
        button2Text: 'View Menu'
    },
    menu: state => state.pages.find(page => page.id === 'menu'),
    location: state => state.pages.find(page => page.id === 'location') || {
        id: "location",
        title: "Location",
        address: {
            state: "CA",
            zip: 90004,
            street: "4255 W. 3rd Street",
            city: "Los Angeles"
        },
        hours: [
            {
                day: "Mon",
                hours: {
                    from: "11:00am",
                    to: "11:00am"
                }
            },
            {
                hours: {
                    from: "11:00am",
                    to: "3:00am"
                },
                day: "Tue"
            },
            {
                hours: {
                    from: "11:00am",
                    to: "3:00am"
                },
                day: "Wed"
            },
            {
                hours: {
                    from: "11:00am",
                    to: "3:00am"
                },
                day: "Thu"
            },
            {
                hours: {
                    to: "3:00am",
                    from: "11:00am"
                },
                day: "Fri"
            },
            {
                hours: {
                    from: "11:00am",
                    to: "3:00am"
                },
                day: "Sat"
            },
            {
                hours: {
                    from: "11:00am",
                    to: "3:00am"
                },
                day: "Sun"
            }
        ],
        phone: 2137392747
    },
    about: state => state.pages.find(page => page.id === 'about') || {
        id: "about",
        content: "<p>Zzamong Restaurant was originally established in May of 2009 by Mr. An who moved to Los Angeles from from S. Korea in 2008. Zzamong's first signature dish, Jam-Bong, was a hit in Koreatown.</p><p>Customers couldn't get enough and were lining up for his new style of Jam-Bong (aka Spicy Noodle Soup). After 4 years of creating a name for himself, Mr. An met another Mr. An who wanted to keep the same tradition of servinghigh quality Chinese! Having the same ancestral background we had an instant bond, I started to call him \"Hyung-nim\" (older brother) right away. My business partner, Andy and I took over the restaurant and have grown the menu to over 100 items adding to the legacy of original menu.</p>   <p>We have added our own improvements to the Ja-Jang-Myeon but the Jam Pong remains the same great recipe. We are very proud to have added many new dishes to the menu so you can enjoy our signature dishes or be adventurous and try some new ones. You will love the food, the service and the atmosphere!</p>",
        title: "About Zzamong",
        aside: "<figure><img src='https://firebasestorage.googleapis.com/v0/b/zzamong-restaurant.appspot.com/o/62140814_2334420679948540_281962945125023744_o.jpg?alt=media&token=4468685b-a75c-4843-8543-b49f7366c1d0' alt=''></figure>",
    },
    press: state => state.pages.find(page => page.id === 'press') || {
        "id": "press",
        "logos": [
            "https://storage.googleapis.com/zzamong-restaurant.appspot.com/eater-logo.png",
            "https://storage.googleapis.com/zzamong-restaurant.appspot.com/los-angeles-times-logo.svg",
            "https://storage.googleapis.com/zzamong-restaurant.appspot.com/law-logo.png"
        ],
        "image": "https://storage.googleapis.com/zzamong-restaurant.appspot.com/location-photo.jpg",
        "links": [
            {
                "title": "10 Stellar Korean-Chinese Fusion Restaurants in Los Angeles",
                "date": "Nov 6, 2015",
                "source": "Eater",
                "url": "https://la.eater.com/maps/korean-chinese-restaurants-los-angeles-map"
            },
            {
                "url": "https://la.eater.com/maps/best-korean-restaurants-koreatown-los-angeles",
                "title": "23 Amazing Korean Restaurants in Los Angeles",
                "date": "Feb 11, 2019",
                "source": "Eater"
            },
            {
                "url": "https://www.latimes.com/food/dailydish/la-dd-korean-chinese-cuisine-los-angeles-20150824-story.html",
                "title": "A Chinese-Korean mashup? Here are 5 restaurants to try in L.A.",
                "date": "Sep 2, 2015",
                "source": "Los Angeles Times"
            },
            {
                "url": "https://la.eater.com/maps/14-under-the-radar-koreatown-restaurants-to-try-now",
                "title": "14 Under-The-Radar Koreatown Restaurants to Try Now",
                "date": " Aug 9, 2013",
                "source": "Eater"
            },
            {
                "source": "LA Weekly",
                "url": "https://www.laweekly.com/the-find-champon-noodle-soup-at-hana-ichimonme-in-little-tokyo/",
                "title": "The Find: Champon Noodle Soup At Hana Ichimonme In Little Tokyo",
                "date": "Nov 6, 2016"
            }
        ],
        "title": "Press",
        "youtube": [
            {
                "id": "a83Oh19iei0",
                "title": "ARDEN EATS | Episode 5: Zzamong (Los Angeles)",
                "img": "https://i.ytimg.com/vi/a83Oh19iei0/sddefault.jpg"
            },
            {
                "id": "Q1RO3HGwyfw",
                "title": "The Spiciest Spots in Ktown!!! - Spicy Challenges w/ Kathythekimchi on KoogleTV - #RainaisCrazy",
                "img": "https://i.ytimg.com/vi/Q1RO3HGwyfw/sddefault.jpg"
            },
            {
                "id": "H9oO7ZTTDr4",
                "title": "[ENG SUB]매운레벨 10단계 LA 고스트페퍼짜장면 도전먹방  Level 10 Spicy jajangmyeon challenge!",
                "img": "https://i.ytimg.com/vi/H9oO7ZTTDr4/sddefault.jpg"
            },
            {
                "id": "QBnyN0yIokw",
                "title": "Spicy Korean Black Bean Noodle Challenge | Zzamong Mukbang",
                "img": "https://i.ytimg.com/vi/QBnyN0yIokw/sddefault.jpg"
            },
            {
                "id": "1oQrVXMXXLk",
                "title": "(eng) 🔥LA spicy challenge🔥 ZZAMONG R.I.P. level Ghost pepper Bul-Jjajang mukbang",
                "img": "https://i.ytimg.com/vi/1oQrVXMXXLk/sddefault.jpg"
            },
            {
                "id": "JczYa3mWlPk",
                "title": "Top 3 Black Bean Noodles (짜장면) in LA | ALL AROUND K-TOWN",
                "img": "https://i.ytimg.com/vi/JczYa3mWlPk/sddefault.jpg"
            },
            {
                "id": "tQbTb35qM-0",
                "title": "Spicy Challenge in LA with Raina Huang | ALL AROUND KTOWN",
                "img": "https://i.ytimg.com/vi/tQbTb35qM-0/sddefault.jpg"
            },
            {
                "id": "OT3yT4Ec1nE",
                "title": "미국 고스트페퍼 짜장면 10단계 지옥의 먹방🔥 LA Ghost Pepper Jjajangmyeon Level 10 Challenge",
                "img": "https://i.ytimg.com/vi/OT3yT4Ec1nE/sddefault.jpg"
            },
            {
                "id": "-v8E7-R8eds",
                "title": "Zzamong (짜몽) in Los Angeles, California",
                "img": "https://i.ytimg.com/vi/-v8E7-R8eds/sddefault.jpg"
            }
        ]
    },
    activeId: state => state.activeId,
    isPageReady: state => state.pages.length > 0
}

export const actions = {
    // Did render from server, but only usefull when using SSR.
    // This app is statically generated, so instead moved the
    // API fetching to the layout level component.
}
