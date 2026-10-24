import { FirebaseError } from "firebase/app";

const authErrorMessages: Record<string, string> = {
  "auth/admin-restricted-operation":
    "Firebase bloqueó el registro. Habilita Email/Contraseña en Authentication → Sign-in method.",
  "auth/api-key-not-valid.-please-pass-a-valid-api-key":
    "La API key de Firebase no es válida. Revisa VITE_FIREBASE_API_KEY en .env.local.",
  "auth/app-not-authorized":
    "Este dominio no está autorizado en Firebase Authentication. Añádelo a los dominios autorizados del proyecto.",
  "auth/configuration-not-found":
    "Firebase Authentication aún no está inicializado para este proyecto. Abre Authentication en Firebase Console y completa la configuración inicial.",
  "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
  "auth/invalid-credential": "El correo o la contraseña no son correctos.",
  "auth/invalid-email": "Ingresa un correo electrónico válido.",
  "auth/invalid-login-credentials":
    "El correo o la contraseña no son correctos.",
  "auth/network-request-failed":
    "No se pudo conectar con Firebase. Comprueba tu conexión.",
  "auth/operation-not-allowed":
    "El inicio de sesión con correo y contraseña no está habilitado en Firebase.",
  "auth/password-policy-violation":
    "La contraseña no cumple la política de contraseñas configurada en Firebase.",
  "auth/requests-to-this-api-are-blocked":
    "La API key tiene restricciones que bloquean Firebase Authentication. Revisa las restricciones de la clave en Google Cloud Console.",
  "auth/too-many-requests":
    "Hubo demasiados intentos. Espera un momento e inténtalo de nuevo.",
  "auth/user-disabled": "Esta cuenta está deshabilitada.",
  "auth/user-not-found": "No existe una cuenta con ese correo.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/wrong-password": "El correo o la contraseña no son correctos.",
};

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    const message = authErrorMessages[error.code];
    return message
      ? `${message} (código: ${error.code})`
      : `Firebase rechazó la solicitud (código: ${error.code}). Revisa Firebase Console y la respuesta de la solicitud en la pestaña Network.`;
  }

  if (
    error instanceof Error &&
    error.message.startsWith("Firebase no está configurado.")
  ) {
    return error.message;
  }

  return "Ocurrió un error de autenticación. Inténtalo de nuevo.";
}
