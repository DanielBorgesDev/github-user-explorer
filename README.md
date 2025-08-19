# GitHub User Explorer

A React + TypeScript application that allows users to search for GitHub profiles, view their repositories, and now also explore a **search history** feature.  
The project is designed following Clean Code and SOLID principles, ensuring maintainability and scalability.

---

## Technical Choices and Trade-offs

- **React + TypeScript**: Provides a strongly-typed environment, improving developer productivity and reducing runtime errors.  
- **React Query**: Used for server state management, caching, and background updates, avoiding manual API state handling.  
- **Local State & LocalStorage for History**: The search history is stored locally in memory (and optionally in `localStorage`) to keep the implementation lightweight.  
  - *Trade-off*: This approach prioritizes simplicity and fast implementation but does not persist across devices. A backend-based solution would solve this limitation.  
- **Vite**: Chosen for fast builds, hot-module replacement, and simplicity compared to traditional bundlers.  
- **SOLID & Clean Code**: The codebase follows separation of concerns (hooks for data, UI components for rendering), improving maintainability.
- **Domain (entities/ports/usecases)**: Defines what the system does, isolating rules and contracts (IGithubRepository, GetUserProfile, GetUserRepos).
- **Infra (adapters)**: Concrete implementation of the repository via GitHub REST API, validation with Zod to ensure runtime types.
- **UI (hooks/components/pages)**: React Query for cache/data state and thin hooks (useGithubUser, useGithubRepos) applying ISP/SRP.

---

## State & data

- @tanstack/react-query for caching, revalidation, and keepPreviousData.
Trade-off: extra dependency vs. less imperative loading/error/refetch code and better UX.

- Zod to validate API responses at runtime.
Trade-off: validation cost vs. stronger safety and debugging.

---

##  Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-user-explorer.git
   cd github-user-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access at:
   ```
   http://localhost:5173
   ```

###  Search History Note
- The **search history** is kept in memory or in the browser's `localStorage` (if enabled).  
- The history persists only locally. Syncing across devices would require backend support.

---

##  Challenges and How They Were Solved

1. **Handling GitHub API rate limits**:  
   - Used React Query to implement caching and retries, reducing redundant API calls.  

2. **Balancing simplicity vs persistence in history feature**:  
   - Current implementation favors **simplicity** by storing history locally.  
   - Acknowledged the trade-off: no cross-device sync yet, but the architecture allows future backend integration.  

3. **Maintaining Clean Code and SOLID principles**:  
   - Implemented hooks for business logic (`useGithubUser`, `useGithubRepos`, `useSearchHistory`).  
   - UI components remain independent and reusable.

---

##  Tech Stack

- **Frontend**: React, TypeScript, Vite  
- **State Management**: React Query  
- **Styling**: TailwindCSS 
- **API**: GitHub REST API  

---

##  Documentation

- Code is documented with inline comments.  
- Commit messages follow **Conventional Commits** for clarity.  
- PRs describe technical decisions, trade-offs, and improvements.

---
##  Challenges & Lessons Learned

Building this project was not only about coding, but also about facing real-world development challenges and making trade-offs that improved my skills as a developer.

### Main challenges
1. **Adopting a layered architecture (Domain/Infra/UI):**  
   At first, splitting the code into multiple layers (entities, usecases, repositories, adapters, hooks) created extra boilerplate and complexity. It was a challenge to design clear contracts and keep the UI decoupled from the data source. However, this approach made the system more maintainable and flexible — for example, switching from REST to GraphQL would require minimal changes.

2. **API validation and error handling:**  
   GitHub API responses can sometimes be incomplete or return unexpected fields (especially when hitting rate limits). Ensuring type safety with **Zod** was initially a performance concern, but in practice it provided robustness and clear debugging, reducing time wasted with silent failures.

3. **React Query integration:**  
   Learning how to properly use caching strategies, stale times, refetching, and `keepPreviousData` required several iterations. Once mastered, it greatly improved the UX and reduced the amount of imperative state management code.

4. **Environment configuration with Vite:**  
   Facing errors related to Node versions, missing polyfills, and dependency optimization was a real challenge. I had to debug `optimizeDeps`, React imports, and `crypto` incompatibilities. Standardizing on **Node 20 LTS** and stabilizing Vite fixed those issues and taught me how environment setup can affect DX.

5. **Testing setup (Vitest + Testing Library):**  
   Creating the initial setup and mocking the GitHub API required effort, especially to keep tests deterministic. Using MSW (Mock Service Worker) turned out to be a powerful tool for simulating API calls.

---

### Experiences and skills gained
- **Clean Architecture in practice:** learned how to apply SOLID and DIP (Dependency Inversion Principle) to keep code scalable and testable.  
- **TypeScript with runtime validation:** combined static typing with runtime checks using **Zod**, which strengthened my understanding of type safety beyond compile time.  
- **React Query expertise:** improved knowledge on caching, revalidation, infinite queries, and how these patterns affect performance and UX.  
- **Debugging complex environments:** gained experience in diagnosing build errors, dependency resolution, and Node/Vite compatibility.  
- **Testing culture:** consolidated skills in unit testing, integration testing, and mocking APIs, making the project more reliable.  
- **Performance vs. robustness trade-offs:** learned to evaluate when it’s worth adding complexity (validation, abstraction) in exchange for long-term maintainability.


---


## Conclusion

The addition of the **Search History Page** enhances user experience by allowing quick access to past searches.  
The current implementation is lightweight and simple, but the design anticipates future scalability with backend integration.
