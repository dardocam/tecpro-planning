👉 **Firebase Authentication es un servicio independiente**: lo único que hace es **probar la identidad del usuario y generar un token de autenticación confiable**.

### 🔹 Entonces, ¿dónde se puede usar?

1. **Con otros servicios de Firebase**

   * Firestore y Realtime Database: para controlar qué datos puede leer/escribir cada usuario.
   * Firebase Storage: para que cada usuario solo acceda a sus archivos.
   * Firebase Functions: para validar que las llamadas a la API provienen de un usuario autenticado.

2. **En aplicaciones propias o externas a Firebase**

   * Podés usar Firebase Authentication como **proveedor de identidad** y luego enviar el **ID Token JWT** a tu propio backend (Node.js, PHP, Java, etc.).
   * Tu backend valida el token con las librerías de Firebase Admin SDK y decide qué permisos darle al usuario.

   🔑 Ejemplo:

   * Tenés una API REST en **PHP o Express**.
   * El frontend (React, Angular, Android, etc.) hace login con Firebase Auth y recibe un **ID Token**.
   * Ese token se manda en el **header Authorization** a tu API.
   * Tu API valida el token y responde con los datos correspondientes.

3. **Como Single Sign-On (SSO)**

   * Podés usarlo para autenticar usuarios con Google, Facebook, Apple, GitHub, Microsoft, etc., sin importar dónde guardes los datos.

---

✅ En resumen: **Firebase Authentication no es exclusivo de Firestore**.
Se usa para **resolver el problema de la autenticación de usuarios** en cualquier tipo de aplicación, ya sea que uses Firebase para los datos o tu propia infraestructura.

---

## Cómo validar la autenticación de Firebase en una **API REST en PHP**.

La idea es:

1. El cliente (React, Angular, Android, etc.) inicia sesión con **Firebase Authentication**.
2. Firebase devuelve un **ID Token (JWT)**.
3. El cliente manda ese token en el **header Authorization** al backend en PHP.
4. El backend valida el token con el **Firebase Admin SDK para PHP**.

---

## 🔹 Paso 1: Instalar dependencias

Necesitamos el SDK de Firebase Admin en PHP:

```bash
composer require kreait/firebase-php
```

Esto incluye soporte para **validar tokens de Firebase**.

---

## 🔹 Paso 2: Configurar credenciales de Firebase

Descargá las credenciales de tu proyecto desde la consola de Firebase:
👉 `Configuración del proyecto > Cuentas de servicio > Generar nueva clave privada`

Esto genera un archivo `firebase-credentials.json`.

---

## 🔹 Paso 3: API en PHP con validación

Ejemplo de un archivo `api.php`:

```php
<?php
require __DIR__.'/vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;

// Inicializar Firebase con credenciales
$factory = (new Factory)
    ->withServiceAccount(__DIR__.'/firebase-credentials.json');

$auth = $factory->createAuth();

// Obtener el token del header Authorization
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["error" => "Token no proporcionado"]);
    exit;
}

$authHeader = $headers['Authorization'];
$idToken = str_replace('Bearer ', '', $authHeader);

try {
    // Validar token
    $verifiedIdToken = $auth->verifyIdToken($idToken);

    // Extraer UID del usuario autenticado
    $uid = $verifiedIdToken->claims()->get('sub');

    echo json_encode([
        "success" => true,
        "message" => "Usuario autenticado correctamente",
        "uid" => $uid
    ]);
} catch (\Kreait\Firebase\Exception\Auth\FailedToVerifyToken $e) {
    http_response_code(401);
    echo json_encode([
        "error" => "Token inválido",
        "details" => $e->getMessage()
    ]);
}
```

---

## 🔹 Paso 4: Ejemplo de llamada desde el cliente

Después de hacer login en el cliente con Firebase (por ejemplo en JavaScript):

```javascript
import { getAuth } from "firebase/auth";

const auth = getAuth();

auth.currentUser.getIdToken(/* forceRefresh */ true)
  .then((idToken) => {
    fetch("http://localhost/api.php", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + idToken
      }
    })
    .then(res => res.json())
    .then(data => console.log(data));
  });
```

---

## 🔹 Flujo final

1. Usuario inicia sesión con Firebase Auth (Google, email/password, etc.).
2. El cliente obtiene un **ID Token JWT**.
3. Ese token se manda al backend PHP en el header.
4. PHP valida el token con las credenciales de Firebase.
5. Si es válido, PHP devuelve datos seguros; si no, responde con error 401.

---

Perfecto 🔥
Vamos a unir todo: **Expo (React Native) + Firebase Auth + API REST en PHP con Fat-Free Framework (F3)**.

El flujo es:

1. **El usuario inicia sesión** en la app (con email y contraseña, por ejemplo).
2. Firebase devuelve un **ID Token (JWT)**.
3. La app lo envía a la **API en Fat-Free Framework (PHP)** en el `Authorization: Bearer <token>`.
4. El backend valida ese token con el SDK de Firebase PHP.

---

## 🔹 1. Configuración en Expo React Native

Instala dependencias en tu proyecto Expo:

```bash
npx expo install firebase
```

---

## 🔹 2. Configurar Firebase en el cliente

Crea `firebaseConfig.js` en tu proyecto:

```javascript
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## 🔹 3. Componente de Login en Expo

Un login sencillo con **email y contraseña**:

```javascript
// LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Iniciar sesión con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener token de Firebase
      const idToken = await user.getIdToken();

      // Enviar token a la API Fat-Free
      const response = await fetch("http://TU_SERVIDOR/api/protegido", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + idToken
        }
      });

      const data = await response.json();
      console.log("Respuesta API:", data);

      Alert.alert("Login exitoso", JSON.stringify(data));
    } catch (error) {
      console.error("Error de login:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login con Firebase</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" }
});
```

---

## 🔹 4. API en PHP con Fat-Free Framework

En tu backend F3, ejemplo `index.php`:

```php
<?php
require __DIR__.'/vendor/autoload.php';

$f3 = \Base::instance();

// Firebase PHP SDK
use Kreait\Firebase\Factory;

$factory = (new Factory)->withServiceAccount(__DIR__.'/firebase-credentials.json');
$auth = $factory->createAuth();

$f3->route('GET /api/protegido', function($f3) use ($auth) {
    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token no proporcionado"]);
        return;
    }

    $idToken = str_replace('Bearer ', '', $headers['Authorization']);

    try {
        $verifiedIdToken = $auth->verifyIdToken($idToken);
        $uid = $verifiedIdToken->claims()->get('sub');

        echo json_encode([
            "success" => true,
            "message" => "Usuario autenticado correctamente",
            "uid" => $uid
        ]);
    } catch (\Exception $e) {
        http_response_code(401);
        echo json_encode([
            "error" => "Token inválido",
            "details" => $e->getMessage()
        ]);
    }
});

$f3->run();
```

---

## 🔹 5. Flujo completo

1. El usuario escribe **email y contraseña** en Expo.
2. Firebase autentica y devuelve el **ID Token**.
3. El cliente llama al endpoint `http://TU_SERVIDOR/api/protegido` con el token.
4. Fat-Free valida el token con Firebase Admin SDK.
5. Si es válido → devuelve `uid` y mensaje ✅.
6. Si no → devuelve `401 Unauthorized ❌`.

---

### Vamos a crear un **middleware en Fat-Free Framework (F3)** para proteger múltiples rutas automáticamente con Firebase Auth. Así evitamos repetir la validación de tokens en cada endpoint.

---

## 🔹 1. Middleware `AuthMiddleware.php`

Creamos un archivo en tu proyecto, por ejemplo `AuthMiddleware.php`:

```php
<?php
// AuthMiddleware.php
use Kreait\Firebase\Factory;

class AuthMiddleware {
    private $auth;

    public function __construct() {
        $factory = (new Factory)->withServiceAccount(__DIR__.'/firebase-credentials.json');
        $this->auth = $factory->createAuth();
    }

    /**
     * Middleware de autenticación
     * - Valida el token JWT de Firebase
     * - Si es válido, setea el UID en F3
     * - Si no, devuelve error 401
     */
    public function handle($f3) {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["error" => "Token no proporcionado"]);
            exit;
        }

        $idToken = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);
            $uid = $verifiedIdToken->claims()->get('sub');

            // Guardar UID en el contexto de la app (se puede usar en controladores)
            $f3->set('UID', $uid);

        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode([
                "error" => "Token inválido",
                "details" => $e->getMessage()
            ]);
            exit;
        }
    }
}
```

---

## 🔹 2. Uso en `index.php`

Ahora en tu `index.php` lo usás para proteger rutas:

```php
<?php
require __DIR__.'/vendor/autoload.php';
require __DIR__.'/AuthMiddleware.php';

$f3 = \Base::instance();
$authMiddleware = new AuthMiddleware();

// Registro sin protección
$f3->route('POST /api/register', function($f3) {
    // ⚠️ Aquí podrías llamar a Firebase para registrar usuarios
    echo json_encode(["message" => "Registro de usuario"]);
});

// Ruta protegida (requiere token válido)
$f3->route('GET /api/protegido',
    function($f3) {
        $uid = $f3->get('UID');
        echo json_encode([
            "success" => true,
            "message" => "Acceso autorizado",
            "uid" => $uid
        ]);
    },
    false, // cache
    // Ejecutar middleware antes de entrar al handler
    [$authMiddleware, 'handle']
);

// Otra ruta protegida
$f3->route('GET /api/perfil',
    function($f3) {
        $uid = $f3->get('UID');
        echo json_encode([
            "perfil" => [
                "uid" => $uid,
                "nombre" => "Usuario de ejemplo"
            ]
        ]);
    },
    false,
    [$authMiddleware, 'handle']
);

$f3->run();
```

---

## 🔹 3. Flujo final

1. Cuando un cliente accede a `/api/protegido` o `/api/perfil`:

   * El middleware `AuthMiddleware` intercepta la request.
   * Valida el `Authorization: Bearer <token>`.
   * Si es válido → guarda el `UID` en `$f3->get('UID')` y pasa al controlador.
   * Si no → devuelve `401 Unauthorized`.

2. En las rutas públicas como `/api/register`, no se aplica middleware.

---

### Vamos a extender el **middleware en Fat-Free (F3)** para que soporte **roles** con **custom claims de Firebase**.


## 🔹 1. Configurar **Custom Claims** en Firebase

En tu backend de administración (o script PHP), podés asignar roles a usuarios:

```php
<?php
require __DIR__.'/vendor/autoload.php';

use Kreait\Firebase\Factory;

$factory = (new Factory)->withServiceAccount(__DIR__.'/firebase-credentials.json');
$auth = $factory->createAuth();

// UID de un usuario existente
$uid = "UID_DEL_USUARIO";

// Asignar rol de admin
$auth->setCustomUserClaims($uid, ['role' => 'admin']);

echo "Rol asignado correctamente";
```

Con esto, el usuario tendrá un **claim `role = admin`**.
Se puede hacer lo mismo para `user`, `editor`, etc.

---

## 🔹 2. Middleware con soporte de roles (`AuthMiddleware.php`)

```php
<?php
use Kreait\Firebase\Factory;

class AuthMiddleware {
    private $auth;

    public function __construct() {
        $factory = (new Factory)->withServiceAccount(__DIR__.'/firebase-credentials.json');
        $this->auth = $factory->createAuth();
    }

    /**
     * Middleware de autenticación con validación opcional de roles
     */
    public function handle($f3, $roles = []) {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["error" => "Token no proporcionado"]);
            exit;
        }

        $idToken = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);
            $uid = $verifiedIdToken->claims()->get('sub');
            $claims = $verifiedIdToken->claims()->all();

            // Guardar info del usuario en F3
            $f3->set('UID', $uid);
            $f3->set('CLAIMS', $claims);

            // Si se requieren roles específicos
            if (!empty($roles)) {
                $userRole = $claims['role'] ?? null;

                if (!$userRole || !in_array($userRole, $roles)) {
                    http_response_code(403);
                    echo json_encode([
                        "error" => "Acceso denegado",
                        "required_roles" => $roles,
                        "user_role" => $userRole
                    ]);
                    exit;
                }
            }

        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode([
                "error" => "Token inválido",
                "details" => $e->getMessage()
            ]);
            exit;
        }
    }
}
```

---

## 🔹 3. Uso en `index.php`

```php
<?php
require __DIR__.'/vendor/autoload.php';
require __DIR__.'/AuthMiddleware.php';

$f3 = \Base::instance();
$authMiddleware = new AuthMiddleware();

// Ruta pública (sin middleware)
$f3->route('GET /api/publico', function() {
    echo json_encode(["message" => "Ruta pública sin autenticación"]);
});

// Ruta protegida para cualquier usuario autenticado
$f3->route('GET /api/protegido',
    function($f3) {
        echo json_encode([
            "message" => "Acceso permitido",
            "uid" => $f3->get('UID'),
            "claims" => $f3->get('CLAIMS')
        ]);
    },
    false,
    [$authMiddleware, 'handle']
);

// Ruta solo para administradores
$f3->route('GET /api/admin',
    function($f3) {
        echo json_encode([
            "message" => "Acceso permitido SOLO para administradores",
            "uid" => $f3->get('UID')
        ]);
    },
    false,
    function($f3) use ($authMiddleware) {
        $authMiddleware->handle($f3, ['admin']);
    }
);

// Ruta solo para usuarios con rol "editor" o "admin"
$f3->route('GET /api/editor',
    function($f3) {
        echo json_encode([
            "message" => "Acceso permitido a editores o administradores",
            "uid" => $f3->get('UID'),
            "role" => $f3->get('CLAIMS')['role']
        ]);
    },
    false,
    function($f3) use ($authMiddleware) {
        $authMiddleware->handle($f3, ['editor', 'admin']);
    }
);

$f3->run();
```

---

## 🔹 4. Flujo final

1. **Login en Expo React Native** → se obtiene un **ID Token**.
2. El cliente llama a la API con `Authorization: Bearer <token>`.
3. El middleware valida el token y los **roles**.

   * `/api/protegido` → cualquier usuario autenticado ✅.
   * `/api/admin` → solo usuarios con `role = admin`.
   * `/api/editor` → usuarios con `role = editor` o `role = admin`.
4. Si el rol no coincide → devuelve **403 Forbidden**.

---

