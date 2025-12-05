# OTP Demo

OTP Demo is a React Native + TypeScript playground that showcases a production-style one-time-password flow. It uses a single-screen navigation stack, custom form controls, and small reusable UI atoms to demonstrate input validation, resend flows, and button states.

## Tech Stack

- React Native 0.82 with React 19
- React Navigation (native stack)
- TypeScript, ESLint, Prettier, Jest
- React Native SVG + Safe Area Context

## Prerequisites

Make sure your local environment satisfies the official [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).

- Node.js 20+ and npm (or Yarn)
- Watchman (macOS) for stable file watching
- Android Studio + Android SDK / emulator
- Xcode, Command Line Tools, and CocoaPods for iOS builds
- Ruby bundler installed if you plan to install Pods via `bundle exec`

## Installation

```sh
git clone <repo-url>
cd OTPDemo
npm install          # or yarn

# iOS-only prerequisites
cd ios && bundle install        # installs CocoaPods via Bundler (first time only)
bundle exec pod install         # install native pods whenever deps change
cd ..
```

## Running the App

1. Start Metro once per session:
   ```sh
   npm start
   ```
2. With Metro running, launch a target:
   - **Android**: `npm run android` (selects first connected/emulated device)
   - **iOS simulator**: `npm run ios`
3. Optional scripts:
   - **Unit tests**: `npm test`
   - **Lint**: `npm run lint`

Metro supports Hot Reload/Fast Refresh. Use the device dev menu (⌘+M / Ctrl+M / shake) to reload or toggle debug options.

## Project Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm start`       | Run Metro bundler                           |
| `npm run android` | Build & deploy the debug app to Android     |
| `npm run ios`     | Build & deploy to the default iOS simulator |
| `npm test`        | Execute Jest unit tests under `__tests__`   |
| `npm run lint`    | Run ESLint using RN’s shared config         |

## Folder Structure

```
OTPDemo
├── App.tsx                # Entry point, sets up navigation + SafeArea
├── __tests__/             # Jest tests (App smoke test)
├── android/               # Native Android project (Gradle)
├── ios/                   # Native iOS project (Xcode + Pods)
├── src/
│   ├── assets/            # SVG icon components
│   ├── component/         # Shared UI atoms (button, headers, errors)
│   ├── constants/         # Design tokens such as colors
│   ├── navigation/        # Root navigator + typed params
│   ├── screens/
│   │   └── otp/           # OTP screen + composed subcomponents
│   ├── types/             # Global ambient type declarations
│   └── utils/             # (Reserved for helpers)
├── vendor/                # Bundled Ruby for deterministic pod installs
├── index.js               # Registers the root component
├── package.json
└── README.md
```

### OTP Flow at a Glance

- `src/screens/otp/OtpScreen.tsx` orchestrates the UI: header, OTP input, verify button, and resend timer.
- `src/screens/otp/component/otpInput` holds a controlled, ref-driven OTP input that exposes `validate()` and `value`.
- `src/screens/otp/component/resendButton` handles cooldown logic and triggers the `onResend` callback.
- `src/component` exports shared pieces such as `Button`, `CommonHeader`, and `ErrorText` to keep the screen lean.

## Troubleshooting

- **Pods fail**: run `bundle exec pod repo update` inside `ios` then retry `pod install`.
- **Android build errors**: ensure an emulator or device is connected and `ANDROID_HOME` is configured.
- **Metro stuck**: clear caches with `npm start -- --reset-cache`.

Need help? Reach out or file an issue with your OS version, RN version, and the exact command output. Happy hacking!
