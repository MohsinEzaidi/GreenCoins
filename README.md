# 🌱 GreenCoins

An Android application that rewards users for completing eco-friendly actions like recycling and participating in clean-up events.

## Features

- ✅ User Authentication (Login/Register)
- ✅ Earn coins by logging eco-friendly actions
- ✅ Redeem coins for rewards
- ✅ Transaction history tracking
- ✅ Clean Material 3 design with green theme

## Tech Stack

- **Language**: Kotlin
- **UI**: Jetpack Compose
- **Architecture**: MVVM
- **Database**: Room
- **DI**: Hilt
- **Navigation**: Jetpack Navigation Compose
- **Min SDK**: 24

## Setup Instructions

1. Clone the repository
2. Open the project in Android Studio (Arctic Fox or later)
3. Sync Gradle dependencies
4. Run the app on an emulator or physical device (Android 7.0+)

## Coin Rules

- Recycle Plastic: 5 coins per item
- Recycle Paper: 3 coins per item
- Clean-up Event: 20 coins per event

## Rewards

- Free Coffee: 50 coins
- 10% Discount: 30 coins
- Mobile Recharge: 100 coins

## Project Structure

```
app/
├── data/          # Data layer (models, entities, DAOs, repositories)
├── domain/        # Business logic (use cases)
├── di/            # Dependency injection modules
├── viewmodel/     # ViewModels
├── navigation/    # Navigation graph
└── ui/            # UI layer (screens, components, theme)
```

## License

This project is open source and available under the MIT License.