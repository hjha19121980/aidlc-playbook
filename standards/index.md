# Coding standards index

One document per language or framework. The `code-review` skill and the `reviewer` agent read this index first, detect the languages in the change, and load the matching documents.

## How to choose the documents
1. List the changed files. Match each extension or manifest in the **Detect by** column.
2. Load the document for each match, plus every document in **Also read** for frameworks (for example Spring Boot also loads Java).
3. Documents marked with local overrides take precedence over the baseline text.
4. If a language has no document, say so in the review and apply general principles (correctness, security, tests); do not invent rule IDs.

| Language or framework | Detect by | Document (and related) | Rules |
|---|---|---|---|
| Java | `*.java`, `pom.xml`, `build.gradle` | `java.md` | 18 |
| Spring Boot | `@SpringBootApplication`, `spring-boot-starter-*` in `pom.xml` or `build.gradle` | `spring-boot.md` (+ `java.md`, `kotlin.md`, `sql.md`) | 15 |
| Kotlin | `*.kt`, `*.kts` | `kotlin.md` (+ `java.md`) | 12 |
| Python | `*.py`, `pyproject.toml`, `requirements.txt` | `python.md` | 16 |
| TypeScript | `*.ts`, `*.tsx`, `tsconfig.json` | `typescript.md` (+ `javascript.md`) | 13 |
| JavaScript | `*.js`, `*.mjs`, `*.cjs`, `package.json` | `javascript.md` | 12 |
| Angular | `angular.json`, `@angular/core` in `package.json`, `*.component.ts` | `angular.md` (+ `typescript.md`) | 13 |
| React | `react` in `package.json`, `*.jsx`, `*.tsx` | `react.md` (+ `typescript.md`, `javascript.md`) | 13 |
| Go | `*.go`, `go.mod` | `go.md` | 12 |
| Ruby | `*.rb`, `Gemfile`, `Rakefile` | `ruby.md` (+ `sql.md`) | 12 |
| COBOL (mainframe) | `*.cbl`, `*.cob`, `*.cpy`, JCL (`*.jcl`, `*.proc`) | `cobol.md` (+ `sql.md`) | 24 |
| Dart and Flutter | `*.dart`, `pubspec.yaml` | `dart.md` | 12 |
| SQL | `*.sql`, migration folders, stored procedures | `sql.md` | 14 |
| C++ | `*.cpp`, `*.cc`, `*.hpp`, `*.h`, `CMakeLists.txt` | `cpp.md` | 13 |
| C# | `*.cs`, `*.csproj`, `*.sln` | `csharp.md` (+ `sql.md`) | 15 |
| R | `*.R`, `*.Rmd`, `DESCRIPTION`, `renv.lock` | `r.md` | 11 |
| PHP | `*.php`, `composer.json` | `php.md` (+ `sql.md`) | 13 |

## Adding or changing a standard
Copy `_template.md` to `<language>.md`, fill it in with a unique prefix, add a row above, and have a language owner approve it in a pull request. Keep rules short, testable, and each with a default severity.
