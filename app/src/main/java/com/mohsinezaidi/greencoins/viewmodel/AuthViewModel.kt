package com.mohsinezaidi.greencoins.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mohsinezaidi.greencoins.data.model.User
import com.mohsinezaidi.greencoins.data.repository.UserRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * ViewModel for authentication screens (Login and Register)
 */
@HiltViewModel
class AuthViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {

    private val _authState = MutableStateFlow<AuthState>(AuthState.Idle)
    val authState: StateFlow<AuthState> = _authState.asStateFlow()

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    /**
     * Login user with email and password
     */
    fun login(email: String, password: String) {
        viewModelScope.launch {
            _authState.value = AuthState.Loading
            try {
                // Validate input
                if (email.isBlank() || password.isBlank()) {
                    _authState.value = AuthState.Error("Please fill in all fields")
                    return@launch
                }

                if (!isValidEmail(email)) {
                    _authState.value = AuthState.Error("Invalid email format")
                    return@launch
                }

                // Attempt login
                val user = userRepository.loginUser(email, password)
                if (user != null) {
                    _currentUser.value = user
                    _authState.value = AuthState.Success(user)
                } else {
                    _authState.value = AuthState.Error("Invalid email or password")
                }
            } catch (e: Exception) {
                _authState.value = AuthState.Error(e.message ?: "Unknown error occurred")
            }
        }
    }

    /**
     * Register new user
     */
    fun register(name: String, email: String, password: String, confirmPassword: String) {
        viewModelScope.launch {
            _authState.value = AuthState.Loading
            try {
                // Validate input
                if (name.isBlank() || email.isBlank() || password.isBlank() || confirmPassword.isBlank()) {
                    _authState.value = AuthState.Error("Please fill in all fields")
                    return@launch
                }

                if (!isValidEmail(email)) {
                    _authState.value = AuthState.Error("Invalid email format")
                    return@launch
                }

                if (password.length < 6) {
                    _authState.value = AuthState.Error("Password must be at least 6 characters")
                    return@launch
                }

                if (password != confirmPassword) {
                    _authState.value = AuthState.Error("Passwords do not match")
                    return@launch
                }

                // Attempt registration
                val userId = userRepository.registerUser(name, email, password)
                if (userId != null) {
                    // Auto-login after successful registration
                    val user = userRepository.getUserById(userId)
                    if (user != null) {
                        _currentUser.value = user
                        _authState.value = AuthState.Success(user)
                    }
                } else {
                    _authState.value = AuthState.Error("Email already exists")
                }
            } catch (e: Exception) {
                _authState.value = AuthState.Error(e.message ?: "Unknown error occurred")
            }
        }
    }

    /**
     * Reset auth state
     */
    fun resetAuthState() {
        _authState.value = AuthState.Idle
    }

    /**
     * Validate email format
     */
    private fun isValidEmail(email: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
}

/**
 * Sealed class representing authentication states
 */
sealed class AuthState {
    object Idle : AuthState()
    object Loading : AuthState()
    data class Success(val user: User) : AuthState()
    data class Error(val message: String) : AuthState()
}