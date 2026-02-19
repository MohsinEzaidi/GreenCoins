package com.mohsinezaidi.greencoins.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.mohsinezaidi.greencoins.ui.screens.action.AddActionScreen
import com.mohsinezaidi.greencoins.ui.screens.auth.LoginScreen
import com.mohsinezaidi.greencoins.ui.screens.auth.RegisterScreen
import com.mohsinezaidi.greencoins.ui.screens.history.HistoryScreen
import com.mohsinezaidi.greencoins.ui.screens.home.HomeScreen
import com.mohsinezaidi.greencoins.ui.screens.rewards.RewardsScreen

/**
 * Main navigation graph for the app
 * Defines all navigation routes and their compositions
 */
@Composable
fun NavGraph(
    navController: NavHostController,
    startDestination: String = Screen.Login.route
) {
    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        // Login Screen
        composable(route = Screen.Login.route) {
            LoginScreen(
                onLoginSuccess = { userId ->
                    navController.navigate(Screen.Home.createRoute(userId)) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                },
                onNavigateToRegister = {
                    navController.navigate(Screen.Register.route)
                }
            )
        }

        // Register Screen
        composable(route = Screen.Register.route) {
            RegisterScreen(
                onRegisterSuccess = { userId ->
                    navController.navigate(Screen.Home.createRoute(userId)) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                },
                onNavigateToLogin = {
                    navController.popBackStack()
                }
            )
        }

        // Home Screen
        composable(
            route = Screen.Home.route,
            arguments = listOf(navArgument("userId") { type = NavType.LongType })
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getLong("userId") ?: 0L
            HomeScreen(
                userId = userId,
                onNavigateToAddAction = {
                    navController.navigate(Screen.AddAction.createRoute(userId))
                },
                onNavigateToRewards = {
                    navController.navigate(Screen.Rewards.createRoute(userId))
                },
                onNavigateToHistory = {
                    navController.navigate(Screen.History.createRoute(userId))
                }
            )
        }

        // Add Action Screen
        composable(
            route = Screen.AddAction.route,
            arguments = listOf(navArgument("userId") { type = NavType.LongType })
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getLong("userId") ?: 0L
            AddActionScreen(
                userId = userId,
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }

        // Rewards Screen
        composable(
            route = Screen.Rewards.route,
            arguments = listOf(navArgument("userId") { type = NavType.LongType })
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getLong("userId") ?: 0L
            RewardsScreen(
                userId = userId,
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }

        // History Screen
        composable(
            route = Screen.History.route,
            arguments = listOf(navArgument("userId") { type = NavType.LongType })
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getLong("userId") ?: 0L
            HistoryScreen(
                userId = userId,
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}