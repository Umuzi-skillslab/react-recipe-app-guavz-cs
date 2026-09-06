[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=24322030&assignment_repo_type=AssignmentRepo)
# Recipe Hub – Recipe Discovery & Meal Planning App

A modern, responsive React application built for a local cooking school partnered with food bloggers. Users can browse and search recipes, view detailed instructions with video & audio guides, mark favorites, and plan weekly meals.

## Features

- Browse & search recipes by title, ingredient, category, cuisine or difficulty
- Recipe detail pages with ingredients checklist, step-by-step instructions
- Embedded HTML5 video tutorials and audio chef-tips
- Favorites system with localStorage persistence
- Weekly meal planner (Mon–Sun × breakfast/lunch/dinner) with localStorage
- Fully responsive design (mobile, tablet, desktop)
- React Router with active link styling and 404 page
- Professional UI with CSS Modules, hover effects and smooth transitions

## Technologies

- React 18 (functional components + hooks only)
- React Router DOM v6
- PropTypes for runtime type checking
- CSS Modules + inline styles + conditional classes
- Vite for fast development & builds
- localStorage for client-side persistence

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Project Structure

```
src/
├── components/
│   ├── common/          # Header, Footer
│   ├── Navigation/      # Navbar (sticky, responsive, active routes)
│   ├── UI/              # Button, Card, SearchBar, Loading, Modal
│   ├── Recipe/          # RecipeCard, RecipeList, RecipeDetail, RecipeFilter
│   ├── MealPlanner/     # MealPlanner, DayCard
│   └── Media/           # VideoPlayer, AudioPlayer
├── pages/               # Home, RecipesPage, MealPlannerPage, FavoritesPage, NotFound
├── data/                # recipesData.js (18 sample recipes)
├── App.jsx              # Root – state, routing, localStorage
└── main.jsx
```

## State Management

- **Lifted state** in `App.jsx`: `recipes`, `favorites`, `mealPlan`, `isLoading`
- Local UI state (search, filters, modal) lives in the relevant page/component
- `useEffect` × 4: load data, hydrate localStorage, persist favorites, persist meal plan
- Immutable updates only (spread operators)

## Routes

| Path              | Component          |
|-------------------|--------------------|
| `/`               | Home               |
| `/recipes`        | RecipesPage        |
| `/recipes/:id`    | RecipeDetail       |
| `/meal-planner`   | MealPlannerPage    |
| `/favorites`      | FavoritesPage      |
| `*`               | NotFound (404)     |

## Sample Data

18 recipes covering:
- Breakfast (3), Lunch (4), Dinner (5), Dessert (3), Snacks (3)

## Future Enhancements

- Real video/audio assets
- Drag-and-drop meal planner
- User accounts & cloud sync
- Grocery list generator
- Nutritional information

---

