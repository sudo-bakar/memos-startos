import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.31.0:0',
  releaseNotes: {
    en_US: `Updated Memos to 0.31.0.

**Features**

- Spaces for shared notes, with members and Space-only visibility
- Calendar and Map views
- Saved Views, location/Space filters, and search improvements
- Export & Import in Memos Export Format (ZIP)
- Multiple named attachment storage backends and chunked uploads

**Upgrade notes**

- RSS feeds were removed upstream; existing feed URLs no longer work
- Public access is now stored independently of the instance URL. It is captured once from the instance URL on first start and can then be changed only in Settings → System → Access and policies
- Reset Admin Password now signs out sessions using the old password
- Integrations using the old Shortcut API must move to the Views API
- Instance administrators can now read and manage all memos, including private ones

[Full release notes](https://github.com/usememos/memos/releases/tag/v0.31.0)`,
    es_ES: `Memos actualizado a 0.31.0.

**Novedades**

- Spaces para notas compartidas, con miembros y visibilidad solo para el Space
- Vistas de Calendario y Mapa
- Vistas guardadas, filtros por ubicación/Space y mejoras en la búsqueda
- Exportación e importación en el formato de exportación de Memos (ZIP)
- Varios backends de almacenamiento de adjuntos con nombre y subida por fragmentos

**Notas de actualización**

- Las fuentes RSS se eliminaron en Memos; las URL de feeds existentes ya no funcionan
- El acceso público ahora se almacena independientemente de la URL de instancia. Se captura una vez a partir de la URL de instancia en el primer inicio y luego solo se cambia en Ajustes → Sistema → Acceso y políticas
- Restablecer contraseña de administrador ahora cierra las sesiones que usaban la contraseña anterior
- Las integraciones que usaban la antigua API de Shortcuts deben pasar a la API de Vistas
- Los administradores de la instancia ahora pueden leer y gestionar todas las notas, incluidas las privadas

[Notas de la versión completa](https://github.com/usememos/memos/releases/tag/v0.31.0)`,
    de_DE: `Memos auf 0.31.0 aktualisiert.

**Neuerungen**

- Spaces für gemeinsame Notizen, mit Mitgliedern und Sichtbarkeit nur für den Space
- Kalender- und Kartenansicht
- Gespeicherte Ansichten, Filter nach Ort/Space und Suchverbesserungen
- Export und Import im Memos-Exportformat (ZIP)
- Mehrere benannte Speicher-Backends für Anhänge und Chunk-Uploads

**Hinweise zum Update**

- RSS-Feeds wurden upstream entfernt; bestehende Feed-URLs funktionieren nicht mehr
- Öffentlicher Zugriff wird jetzt unabhängig von der Instanz-URL gespeichert. Er wird beim ersten Start einmalig aus der Instanz-URL übernommen und danach nur noch unter Einstellungen → System → Zugriff und Richtlinien geändert
- Administrator-Passwort zurücksetzen meldet jetzt Sitzungen ab, die das alte Passwort verwendet haben
- Integrationen, die die alte Shortcut-API nutzen, müssen auf die Views-API umsteigen
- Instanz-Administratoren können jetzt alle Notizen lesen und verwalten, auch private

[Vollständige Versionshinweise](https://github.com/usememos/memos/releases/tag/v0.31.0)`,
    pl_PL: `Zaktualizowano Memos do 0.31.0.

**Nowości**

- Spaces do współdzielonych notatek, z członkami i widocznością tylko dla Space
- Widoki Kalendarza i Mapy
- Zapisane widoki, filtry według lokalizacji/Space i ulepszone wyszukiwanie
- Eksport i import w formacie eksportu Memos (ZIP)
- Wiele nazwanych backendów przechowywania załączników i wysyłanie w fragmentach

**Informacje o aktualizacji**

- Kanały RSS zostały usunięte w Memos; istniejące adresy kanałów przestały działać
- Dostęp publiczny jest teraz przechowywany niezależnie od adresu instancji. Jest przechwytywany raz z adresu instancji przy pierwszym uruchomieniu, a następnie zmieniany tylko w Ustawienia → System → Dostęp i zasady
- Resetowanie hasła administratora wylogowuje teraz sesje używające starego hasła
- Integracje korzystające ze starego API Shortcuts muszą przejść na API Widoków
- Administratorzy instancji mogą teraz czytać i zarządzać wszystkimi notatkami, także prywatnymi

[Pełne informacje o wydaniu](https://github.com/usememos/memos/releases/tag/v0.31.0)`,
    fr_FR: `Memos mis à jour vers 0.31.0.

**Nouveautés**

- Spaces pour les notes partagées, avec membres et visibilité limitée au Space
- Vues Calendrier et Carte
- Vues enregistrées, filtres par lieu/Space et améliorations de la recherche
- Export et import au format d'export Memos (ZIP)
- Plusieurs backends de stockage de pièces jointes nommés et envoi par fragments

**Notes de mise à niveau**

- Les flux RSS ont été supprimés en amont ; les URL de flux existantes ne fonctionnent plus
- L'accès public est désormais stocké indépendamment de l'URL d'instance. Il est capturé une fois à partir de l'URL d'instance au premier démarrage, puis modifié uniquement dans Paramètres → Système → Accès et politiques
- La réinitialisation du mot de passe administrateur déconnecte désormais les sessions utilisant l'ancien mot de passe
- Les intégrations utilisant l'ancienne API Shortcuts doivent migrer vers l'API Vues
- Les administrateurs d'instance peuvent désormais lire et gérer toutes les notes, y compris privées

[Notes de version complètes](https://github.com/usememos/memos/releases/tag/v0.31.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
