# runecast-inventory

Project is developed with Vue3, Typescript and Tailwind as requested.

Tried to go with the `script setup` at first, but it's still in a very unstable state currently.
As a result decided to play safe with `defineComponent` and Composition API's `setup`.

This was my first project to actually use Tailwind, and I have to say I'm impressed. I've written
no CSS/SCSS after all. I've seen that design was developed with Tailwind in mind and that was a point
made the usage of Tailwind a breeze for the project.

I haven't used any virtual-listing of any kind, but it could be the next step I would've taken.
The application is bound to cause performance issues with huge data. I've tried to eliminate that
as much as possible by using CPU instead of Memory by using `v-if` and not 'v-show'.

# Running application 

Install Dependencies
```
npm install
```
Serve Application
```
npm run serve
```
