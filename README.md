# ScrollLimiter

[English](README.md) | [简体中文](README.zh.md)

## How I Defeated a Million-Dollar Social Product Design with 100 Lines of Code - A Programmer's Counter-attack

A top social product pays at least $500,000 annually for a product manager and $300,000 for an interaction designer. Their carefully designed 'infinite scrolling' mechanism, which took months to develop, was completely undermined by just over 100 lines of code I wrote in one afternoon...

Here's the browser extension (download, unzip, and install in developer mode): [Project Link](https://github.com/kmfb/ScrollLimiter)

A brief summary of the core business logic behind social products' "infinite scrolling" design:

#### 1. Core Product Design Patterns
- Infinite scrolling is like a bottomless lucky box
- Each pull-down gives you a possibility of "surprise"
- You never know what the next content will be, but you want to keep looking
- No clear endpoint, making you lose track of time

#### 2. Underlying Psychological Principles
- Expectation and Reward: Like slot machines in a casino
- Fear of Missing Out: Always feeling there might be better content just one more scroll away
- Sunk Cost Fallacy: "I've scrolled this far, might as well continue"

#### 3. My Solution
```javascript
// It only takes this simple code to break their carefully designed pattern
if (scrollY >= limit) {
    stop();    // Give users a clear endpoint
    notify();  // Remind users it's time to take a break
}
```

#### 4. Why It Works?
- Product design relies on making you lose yourself
- We simply added a "destination reminder"
- Like setting an alarm in a casino to remind you when it's time to go home

This isn't a victory of technology, but a victory of consciousness.

#### 5. Technical Implementation
- Core code is just over 100 lines
- Development time: One afternoon
- Development cost: $4 Starbucks steamed milk (Don't ask why, it's the minimum cost for an optimal environment)
- Maintenance cost: Almost zero

#### 4. Comparison of Results
- Product Team Investment:
  - Product Manager Salary: $40,000+/month
  - Interaction Designer Salary: $25,000+/month
  - Development Team Cost: $100,000+
  - Product Iteration Cycle: 3-6 months
  - Total Cost: About $1 million

- My Solution:
  - Development Time: 1 hour
  - Code Size: 130 lines
  - Development Cost: $4
  - Maintenance Cost: $0
  - Effect: Completely counteracts the original product design

#### 5. Supported Platforms (Highlighting Coverage)
```javascript
// One development, multi-platform coverage
"matches": [
  "*://*.facebook.com/*",
  "*://*.twitter.com/*",
  "*://*.weibo.com/*",
  "*://*.zhihu.com/*",
  "*://*.xiaohongshu.com/*",
  "*://*.bilibili.com/*"
  // ... more mainstream platforms
]
```

Perhaps I'm as ridiculous as Don Quixote - fighting sophisticated business designs with simple code. But as Don Quixote taught us: sometimes madness and idealism are more powerful than cleverness.

This isn't a victory, but a romantic rebellion. 