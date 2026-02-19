package com.mohsinezaidi.greencoins.ui.screens.rewards

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.mohsinezaidi.greencoins.data.model.Reward
import com.mohsinezaidi.greencoins.viewmodel.RewardsState
import com.mohsinezaidi.greencoins.viewmodel.RewardsViewModel

/**
 * Rewards screen
 * Displays available rewards and allows users to redeem them
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RewardsScreen(
    userId: Long,
    onNavigateBack: () -> Unit,
    viewModel: RewardsViewModel = hiltViewModel()
) {
    // Load user data
    LaunchedEffect(userId) {
        viewModel.loadUser(userId)
    }

    val rewardsState by viewModel.rewardsState.collectAsState()
    val rewards by viewModel.rewards.collectAsState()
    val currentUser by viewModel.currentUser.collectAsState()

    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(rewardsState) {
        when (val state = rewardsState) {
            is RewardsState.Success -> {
                snackbarHostState.showSnackbar(
                    message = state.message,
                    duration = SnackbarDuration.Short
                )
                viewModel.resetRewardsState()
            }
            is RewardsState.Error -> {
                snackbarHostState.showSnackbar(
                    message = state.message,
                    duration = SnackbarDuration.Short
                )
                viewModel.resetRewardsState()
            }
            else -> {}
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Rewards") },
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
        ) {
            // User balance header
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
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
                        text = "Your Balance:",
                        style = MaterialTheme.typography.titleMedium
                    )
                    Text(
                        text = "🪙 ${currentUser?.coinBalance ?: 0}",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }

            // Rewards list
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(rewards) { reward ->
                    RewardCard(
                        reward = reward,
                        canAfford = viewModel.canAffordReward(reward),
                        onRedeem = { viewModel.redeemReward(userId, reward) },
                        isLoading = rewardsState is RewardsState.Loading
                    )
                }
            }
        }
    }
}

@Composable
fun RewardCard(
    reward: Reward,
    canAfford: Boolean,
    onRedeem: () -> Unit,
    isLoading: Boolean
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Reward icon
            Text(
                text = reward.icon,
                style = MaterialTheme.typography.displaySmall,
                modifier = Modifier.padding(end = 16.dp)
            )

            // Reward info
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = reward.name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = reward.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "🪙 ${reward.coinCost} coins",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.Medium
                )
            }

            // Redeem button
            Button(
                onClick = onRedeem,
                enabled = canAfford && !isLoading,
                modifier = Modifier.width(100.dp)
            ) {
                Text(
                    text = if (isLoading) "..." else "Redeem",
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}