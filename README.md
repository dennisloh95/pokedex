# Custom Pokedex 👾

A Pokedex list all the pokemon from [Pokeapi.co](https://pokeapi.co/). It also support "add pokemon feature".

Add pokemon feature will make use of browser localstorage. While filling the data, user will need to insert some required data, and it allow user to upload an pokemon image, image will convert to Base64 format so that it can store as a string in localstorage. Some data requirement rules like Pokemon's types & abilities are refer to PokemonWiki.Every creation will record a totalCreated value to define pokemon id, this id can use to display as Pokemon index, as well as handle for edit and delete.

# Documentation

- [Live Demo](https://dennis-pokedex.netlify.app/)
- [Development](#development)

# Development

## Initial Setup

##### Install all dependencies for React App

```bash
npm: npm install
yarn: yarn install
```

## Running App

##### Running app in development enviroment

```bash
npm: npm run dev
yarn: yarn dev
```

## Project Structure

```txt
pokedex/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ store/
│  ├─ utils/
│  │  └─ config.ts
│  │  └─ helpers.ts
│  │  └─ hooks.ts
│  │  └─ types.ts
```

| Directory            | Description                                   |
| -------------------- | --------------------------------------------- |
| `/src/components`    | Main components to supported the app features |
| `/src/pages`         | Frontend Pages                                |
| `/src/store`         | Global State                                  |
| `/src/utils/config`  | Define config values                          |
| `/src/utils/helpers` | Define helpers functions                      |
| `/src/utils/hooks`   | Define custom hooks                           |
| `/src/utils/types`   | Define reusable typescript types              |
