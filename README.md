# UntisPlanner

> [!CAUTION]
> UntisPlanner is still in Development. Until `v1.0.0` you will find bugs and broken/unfinished features.

## ✨ Installation and Configuration

### Installation for Development 
1. clone the repository:
```bash
git clone https://github.com/Dino-Kupinic/UntisPlanner.git
```
2. install packages (```-f``` might be needed)
```bash
npm i 
```
3. install playwright browsers for testing
```bash
npx playwright install
```
4. run dev server
```bash
npm run dev
```
5. Head to http://localhost:3001/

## 🚀 Deployment
1. run build
```bash
npm run build
```
2. check if everything works as it should
```bash
npm run preview
```
3. Head to http://localhost:3000/
4. All generated assets can be found in `./output`

> [!TIP]
> Further information regarding deployment can be found on https://nuxt.com/deploy

## 🌍 Live Demo
A live demo of UntisPlanner is available on https://untis-planner.vercel.app/

> [!IMPORTANT]  
> The live demo is based on the `main` branch. If you want to test the latest features, you should head to the `develop` branch.

## 😄 Authors

- [@Dino Kupinic](https://www.github.com/Dino-Kupinic)
- [@Michael Ploier](https://www.github.com/MPloier)
- [@Jannick Angerer](https://www.github.com/Neuery17Alt)
- [@Daniel Samhaber](https://www.github.com/dsamhabe)

## 🛠️ Tech Stack

**Client:** 
- Nuxt 3 with TypeScript

**Libraries:** 
- NuxtUI
- VueUse
- Pinia
- date-holidays
- PWA
- VCalendar
- Vitest
- Playwright

You can find all dependencies in the `package.json` and for the `nuxt.config.ts` in the `modules` section.

## 🦋 License

[GNU](https://choosealicense.com/licenses/gpl-3.0/)


