
const routes = [
  // ---------------- ADVENTURE SCHOOL ------------------------
  {
    path: "/splash/:uid",
    component: () => import("pages/adventure-splash.vue"),
    name: "adventure-splash"
  },
  {
    path: "/adventure/login",
    component: () => import("pages/adventure-login.vue"),
    name: "adventure-login"
  },

  // ---------------- TUTOR ------------------------
  {
    path: "/tutor",
    component: () => import("pages/tutor-splash.vue"),
    name: "tutor-splash"
  },
  {
    path: "/tutor/login",
    component: () => import("pages/tutor-login.vue"),
    name: "tutor-login"
  },

  // ---------------- DISCOVERY ONLINE ------------------------
  {
    path: "/discovery",
    component: () => import("pages/discovery-splash.vue"),
    name: "discovery-splash"
  },

  {
    path: "/discovery/login",
    component: () => import("pages/discovery-login.vue"),
    name: "discovery-login"
  },

  // ---------------- PAGE ------------------------
  {
    path: "/character",
    component: () => import("pages/character.vue"),
    name: "character"
  },
  {
    path: "/dashboard",
    component: () => import("pages/dashboard.vue"),
    name: "dashboard"
  },
  {
    path: "/landing",
    component: () => import("pages/landing.vue"),
    name: "landing"
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/lobby",
        component: () => import("pages/lobby.vue"),
        name: "lobbdy"
      }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/PracticeLayout.vue"),
    children: [
      {
        path: "/practicemain",
        component: () => import("pages/practiceListMain.vue"),
        name: "practicemain"
      },
      // Flashcard Main
      {
        path: "/flashcard",
        component: () => import("pages/flashcardMain.vue"),
        name: "flashcard"
      },

      // Spelling Bee Main
      {
        path: "/spellingbee",
        component: () => import("pages/spellingMain.vue"),
        name: "spellingbee"
      },

      // Multiple Vocab Main
      {
        path: "/multiplevocab",
        component: () => import("pages/multiplevocabMain.vue"),
        name: "multiplevocab"
      },

      // Matching Main
      {
        path: "/matching",
        component: () => import("pages/matchingMain.vue"),
        name: "matching"
      },

      // Phonics Multiple Main
      {
        path: "/phonicsmultiple",
        component: () => import("pages/phonicsMultipleMain.vue"),
        name: "phonicsmultiple"
      },

      // Conversation Multiple Main
      {
        path: "/conversationmultiple",
        component: () => import("pages/conversationMultipleMain.vue"),
        name: "conversationmultiple"
      },

      // Language Tip Main
      {
        path: "/languagetipmultiple",
        component: () => import("pages/languagetipMultipleMain.vue"),
        name: "languagetipmultiple"
      },

      // Grammar Multiple Main
      {
        path: "/grammarmultiple",
        component: () => import("pages/grammarMultipleMain.vue"),
        name: "grammarmultiple"
      },

      // Reading Multiple Main
      {
        path: "/readingmultiple",
        component: () => import("pages/readingMultipleMain.vue"),
        name: "readingmultiple"
      },

      // Grammar Action
      {
        path: "/grammaraction",
        component: () => import("pages/grammarActionMain.vue"),
        name: "grammaraction"
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes
