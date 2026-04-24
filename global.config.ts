export const globalConfig = {
  features: {
    preloader: false,
  },
  playfulUi: {
    onekoFollower: {
      enabled: true,
      zIndex: 10_999,
      scale: 1,
      opacity: 1,
      meow: false,
      followDistance: 40,
    },
    footerNyanCat: false,
  },
  sounds: {
    enabled: true,
    volumes: {
      themeToggle: 0.3,
      buttonClick: 1,
    },
  },
} as const;

export type GlobalConfig = typeof globalConfig;
