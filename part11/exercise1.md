# Exercise 1

Let’s say we are building a Python application with a team of six developers. Since the project is under active development and about to be released, having a solid CI setup is critical. The main steps in CI are linting, testing, and building.

For linting, popular tools in the Python ecosystem include `Flake8`, `Pylint`, `Ruff`, and `Black`. Flake8 and Pylint help catch style and logic errors, while Black is a strict auto-formatter that ensures consistent code style across the team. Ruff is a newer, very fast linter that many teams are adopting. These tools help keep the codebase clean and maintainable, which is especially important when multiple developers are working on the same code.

For testing, the most common framework is `pytest`, which is flexible and widely used. The built-in `unittest` module and `nose2` are alternatives, but pytest is usually preferred for its readability and plugin support. To measure test coverage, tools like `coverage.py` are standard. If we want to test across different Python versions or environments, `tox` is often used.

For building and packaging, `setuptools` and `wheel` are the main tools in Python. These allow the code to be packaged and distributed properly.

Besides Jenkins and GitHub Actions, alternatives for CI include `GitLab CI`, `CircleCI`, `Travis CI`, and `Buildkite`. Each has different strengths, pricing, and integrations.

As for hosting, cloud-based CI is easier to maintain, scales automatically, and requires less internal infrastructure. A self-hosted setup might be better if sensitive data or compliance issues prevent cloud use. To decide, we’d need information on budget, security requirements, team expertise, and deployment environments.

