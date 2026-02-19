package com.mohsinezaidi.greencoins.ui.screens.action

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.mohsinezaidi.greencoins.data.model.ActionType
import com.mohsinezaidi.greencoins.ui.components.GreenCoinsButton
import com.mohsinezaidi.greencoins.ui.components.GreenCoinsTextField
import com.mohsinezaidi.greencoins.viewmodel.ActionState
import com.mohsinezaidi.greencoins.viewmodel.ActionViewModel

/**
 * Add Action screen
 * Allows users to log eco-friendly actions and earn coins
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddActionScreen(
    userId: Long,
    onNavigateBack: () -> Unit,
    viewModel: ActionViewModel = hiltViewModel()
) {
    val actionState by viewModel.actionState.collectAsState()
    val selectedActionType by viewModel.selectedActionType.collectAsState()
    val quantity by viewModel.quantity.collectAsState()

    // Show snackbar for success/error
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(actionState) {
        when (val state = actionState) {
            is ActionState.Success -> {
                snackbarHostState.showSnackbar(
                    message = "Congratulations! You earned ${state.coinsEarned} coins!",
                    duration = SnackbarDuration.Short
                )
                viewModel.resetActionState()
                onNavigateBack()
            }
            is ActionState.Error -> {
                snackbarHostState.showSnackbar(
                    message = state.message,
                    duration = SnackbarDuration.Short
                )
            }
            else -> {}
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Add Action") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    navigationIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(24.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header
            Text(
                text = "🌍",
                style = MaterialTheme.typography.displayMedium
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Log Your Eco-Action",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Select your action and earn coins!",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(32.dp))

            // Action Type Selection
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surface
                ),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = "Select Action Type",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(bottom = 12.dp)
                    )

                    ActionType.values().forEach { actionType ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .selectable(
                                    selected = (selectedActionType == actionType),
                                    onClick = { viewModel.updateActionType(actionType) }
                                )
                                .padding(vertical = 12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = (selectedActionType == actionType),
                                onClick = { viewModel.updateActionType(actionType) }
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = actionType.displayName,
                                    style = MaterialTheme.typography.bodyLarge,
                                    fontWeight = FontWeight.Medium
                                )
                                Text(
                                    text = if (actionType == ActionType.CLEANUP_EVENT) {
                                        "${actionType.coinsPerItem} coins per event"
                                    } else {
                                        "${actionType.coinsPerItem} coins per item"
                                    },
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                        }
                        if (actionType != ActionType.values().last()) {
                            Divider()
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Quantity Input
            GreenCoinsTextField(
                value = quantity,
                onValueChange = { viewModel.updateQuantity(it) },
                label = if (selectedActionType == ActionType.CLEANUP_EVENT) "Quantity (Fixed at 1)" else "Quantity",
                placeholder = "Enter quantity",
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                enabled = selectedActionType != ActionType.CLEANUP_EVENT,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            // Coins Preview
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                )
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Coins You'll Earn:",
                        style = MaterialTheme.typography.titleMedium
                    )
                    val coinsToEarn = (quantity.toIntOrNull() ?: 0) * selectedActionType.coinsPerItem
                    Text(
                        text = "🪙 $coinsToEarn",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Submit Button
            GreenCoinsButton(
                text = if (actionState is ActionState.Loading) "Submitting..." else "Submit Action",
                onClick = { viewModel.submitAction(userId) },
                enabled = actionState !is ActionState.Loading
            )
        }
    }
}