# Task Force Demo Programm

## Setup

### 1. NPM installieren

Falls der Node-Package-Manager auf Ihrer IBM i noch nicht installiert ist folgen Sie [dieser](https://docs.profoundlogic.com/display/PUI/Installing+Node.js+for+IBM+i) Anleitung


### 2. Profound.js installieren

Um Profound.js zu installieren, folgen Sie [dieser](https://docs.profoundlogic.com/display/PUI/Installing+Profound.js) Anleitung.

### 3. Demo Programm vorbereiten

Nachdem Sie eine Profound.js Instanz für dieses Demonstrationsprogramm erstellt haben, kopieren Sie den Inhalt des Git-Repositories in den Ordner Ihrer Profound.js Instanz.
Anschließend müssen Sie einige Einstellungen vornehmen:

- Node Pakete installieren
  Node Pakete werden nicht im Git-Repository mitgeliefert und müssen zusätzlich installiert werden.
  Alle Abhängigkeiten werden in der `package.json` aufgeführt. Der folgende Befehl installiert automatisch alle nötigen Pakete, wenn er im gleichen Ordner ausgeführt wird, in dem die `package.json` liegt:
  `npm install`
- Profound UI updaten
  Der folgende Befehl bringt die Profunde UI für diese Instanz auf den neuesten Stand:
  `npm run update_pui`
- Zugangsdaten speichern
  Da die Profound.js Instanz auf Ihre IBM i zugreifen wird, müssen Sie Ihre Zugangsdaten für diese Instanz hinterlegen. Der folgende Befehl speichert Ihre Zugangsdaten in verschlüsselter Form für diese Profound.js Instanz: `npm run store_credentials`
  Die erstellte Datei muss im Ordner `creds` abgelegt werden. Das Programm erwartet die Datei unter folgendem Pfad: `creds/credentials`
- Konfiguration anpassen
  Es gibt drei unterschiedliche Konfigurationsdateien für dieses Programm. Das Programm lädt die entsprechende Instanz abhängig von der Plattform auf der es gestartet wird.`config.js` ist die Default Konfiguration, `config.aix.js` wird für Instanzen auf der IBM i verwendet und `config.win32.js` auf Windows Maschinen. Die `connectorURL`, `connectorLibrary` und `profounduiLibrary` müssen an Ihr System angepasst werden.

## Verwendung

Alle Links können in der `path.js` gefunden werden. Um auf einen Link zuzugreifen müssen Sie Ihre Serveraddresse, den Port auf der die Instanz läuft (Standard: 8088) und den link angeben.
Ein Beispiel für das Hauptprogramm ist: IBMi:8088/P3

Um den Visual Designer zu starten verwenden Sie den Link `/nodedesigner`. Der Visual Designer verwendet die JSON-Dateien. Das Design des Hauptprogramms ist beispielsweise `modules/P3NOV2020/P3.json`
