# Lazy Adventure
Helps you to create adventures. Build **Lazy Adventure** on your local machine and play Dungeon and Dragons or Pathfinder online with your friends!
**This is backend repository**. 

## Goals
**Lazy Adventure** is a tiny tool that helps you to play roleplay games like DnD online. This instrument allows you to create character, make a pixel art custom map, and use all of this in real time.

## Installation
To run project locally you need to have NodeJS and npm / pnpm installed.

Project contains to main parts: backend and frontend. Backend is builded with NodeJS and Socket.io.

Frontend service is available here https://github.com/vukolovanton/lazy-adventure

Create folder on your machine and open terminal in it.
```
git clone https://github.com/vukolovanton/lazy-adventure.git
git clone https://github.com/vukolovanton/lazy-adventure-backend.git

cd lazy-adventure
npm install
npm run dev
cd ../
cd lazy-adventure-backend
npm install
npm run dev
```

### Application parts FAQ
- **Stats Editor**

Here you can create and fill your character player sheet. This list includes most common properties and based on DnD-5 sheet. For saving changes you can press `Save` button or just leave page.

![ezgif com-gif-maker-2](https://user-images.githubusercontent.com/53794193/170096224-86b2b3fa-cee9-4de7-a8b0-be2a0f203774.gif)

- **Map Editor**

Build a ingame field using simple pixel art builder. Select field on a left spritesheet, then click on right space to draw. You can select layer to draw at a tool panel. Shift+left click allows you to delete cell content.

After editing is complete, click on `Export Image` to save image on a server. It will appear on a map selection menu on a game field.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/53794193/170096165-2494bdb1-43df-4ba7-95c2-c4fd606aa502.gif)

- **Game Field**

Main game screen. Join with your friends to the app: you can move characters, add enemies and roll a dice. All players recive updates automatically.

![ezgif com-gif-maker-3](https://user-images.githubusercontent.com/53794193/170096565-5293cc56-9f0d-4d31-92bc-966fd811817d.gif)
