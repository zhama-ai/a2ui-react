# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The @zhama/a2ui team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by email to:

📧 **security@zhama.com**

Include the following information:
- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- **Initial Response**: You should receive a response within 48 hours acknowledging your report
- **Assessment**: We will assess the vulnerability and determine its severity
- **Updates**: You will receive regular updates about our progress (at least once per week)
- **Resolution**: Once the issue is resolved, we will notify you and publicly disclose the vulnerability
- **Credit**: With your permission, we will acknowledge your contribution in the security advisory

### Security Advisory Process

1. **Verification**: We verify and confirm the vulnerability
2. **Fix Development**: We develop and test a fix
3. **Release**: We release a new version with the fix
4. **Disclosure**: We publish a security advisory on GitHub
5. **Credit**: We credit the reporter (unless anonymity is requested)

## Security Best Practices

When using @zhama/a2ui:

### Input Validation
- Always validate and sanitize data from LLMs before rendering
- Be cautious with user-generated content in A2UI components
- Use proper type checking with TypeScript

### Action Handling
- Validate action payloads before processing
- Implement proper authentication for sensitive actions
- Use CSRF protection for state-changing operations

### Dependencies
- Keep all dependencies up to date
- Run `npm audit` regularly to check for vulnerabilities
- Use tools like Dependabot to automate dependency updates

### Content Security
- Implement Content Security Policy (CSP) headers
- Be careful with markdown rendering (we use react-markdown with safe defaults)
- Sanitize any HTML content before rendering

## Known Limitations

### Markdown Rendering
- We use `react-markdown` which has built-in XSS protection
- However, always validate LLM outputs before rendering

### Action System
- Actions execute in the client context
- Implement server-side validation for all actions
- Never trust client-side action payloads

## Security Updates

Security updates will be released as patch versions and announced through:
- GitHub Security Advisories
- npm package updates
- Email notifications to the mailing list (if you're subscribed)

## Scope

The following are **in scope** for vulnerability reports:
- XSS vulnerabilities in component rendering
- Injection attacks through LLM outputs
- Authentication/authorization bypass in examples
- Denial of Service vulnerabilities
- Information disclosure

The following are **out of scope**:
- Social engineering attacks
- Physical attacks
- Vulnerabilities in dependencies (report these to the dependency maintainers)
- Issues in development-only code
- Theoretical attacks without proof of concept

## Safe Harbor

We support safe harbor for security researchers who:
- Make a good faith effort to avoid privacy violations, data destruction, and service interruption
- Only interact with accounts you own or with explicit permission of the account holder
- Do not exploit vulnerabilities beyond the minimum necessary to confirm their existence

We will not pursue legal action against researchers who follow these guidelines.

## Questions?

If you have questions about this security policy, please contact us at security@zhama.com

---

Last updated: 2025-12-25










