package com.mohsinezaidi.greencoins.navigation

/**
 * Sealed class representing all navigation destinations in the app
 */
sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Register : Screen("register")
    object Home : Screen("home/{userId}") {
        fun createRoute(userId: Long) = "home/$userId"
    }
    object AddAction : Screen("add_action/{userId}") {
        fun createRoute(userId: Long) = "add_action/$userId"
    }
    object Rewards : Screen("rewards/{userId}") {
        fun createRoute(userId: Long) = "rewards/$userId"
    }
    object History : Screen("history/{userId}") {
        fun createRoute(userId: Long) = "history/$userId"
    }
}