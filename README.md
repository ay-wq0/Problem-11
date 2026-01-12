# Problem 11 – Algorithms, Explained Visually

# Recursive AI Reasoning Visualizer

## 📌 Project Overview

This project is a **visual learning tool** that shows how **recursive algorithms** work and how **optimization techniques** like pruning improve performance.

Instead of just running algorithms in the background, this project:

* **Draws every step**
* **Shows decisions visually**
* **Compares brute-force recursion vs optimized recursion side by side**

The goal is to make recursion **easy to understand**, even for beginners.

---

## 🎯 What This Project Does

* Graphically displays different **problem-solving tasks**
* Animates each **recursive step**
* Compares:

  * **Brute DFS** (tries everything)
  * **Optimized DFS** (stops early when rules are broken)
* Shows live metrics:

  * Steps taken
  * States visited
  * Branches pruned
* Supports **step-by-step narration mode**

---

## 🧠 Algorithms Used

### 1️⃣ Brute DFS (Brute-Force Depth First Search)

**What it does:**

* Tries **every possible choice**
* Does not skip bad paths
* Does not stop early
* Uses recursion only

**Why it exists:**

* To show how recursion works in its simplest form
* To demonstrate why brute force becomes slow

**Visual behavior:**

* Explores many unnecessary paths
* Takes more steps
* Visits more states

---

### 2️⃣ Optimized DFS (DFS with Pruning)

**What it does:**

* Uses recursion like brute DFS
* Checks rules before continuing
* Stops exploring paths that break rules

**Why it exists:**

* To show how small checks save a lot of work
* To demonstrate real-world optimization

**Visual behavior:**

* Explores fewer paths
* Stops early on invalid choices
* Shows red prune flashes when paths are cut off

---

## 🧩 Problems Demonstrated

### 🟡 Cards / Coins Problem

* Goal: Collect all coins
* Choices:

  * Collect 1 coin
  * Collect 2 coins
* Demonstrates:

  * Basic recursion
  * Branching choices
  * Goal detection

---

### 🏴‍☠️ Pirates and Gold

* Goal: Distribute gold among pirates in every possible way
* Demonstrates:

  * Combinatorial explosion
  * Why brute force scales poorly
* No pruning is used on purpose

---

### 🤝 Handshake Problem

* Goal: Everyone shakes hands with everyone else **once**
* Rules:

  * No duplicate handshakes
* Demonstrates:

  * Constraints
  * Pruning invalid states
  * Difference between brute and optimized DFS

---

### 💺 Airline Seat Assignment (Permutations)

* Goal: Assign passengers to seats
* Rules:

  * Each seat can be used only once
* Demonstrates:

  * Permutations
  * Backtracking
  * Why visited-state checks are disabled for permutations

---

### 🎂 Birthday Assignment

* Goal: Assign unique birthdays to people
* Rule:

  * No two people can share the same birthday
* Demonstrates:

  * Constraint satisfaction
  * Pruning duplicate choices early

---

## 🖥️ How the Visualization Works

* The canvas is split into **two halves**:

  * Left: **Brute DFS**
  * Right: **Optimized DFS**
* Both algorithms solve the **same problem at the same time**
* Each recursive step:

  * Clears its half of the canvas
  * Draws the current state
  * Updates live metrics
* Optional **step-by-step narration** allows manual progression

---

## 🎮 How to Use the Project

1. Open `index.html` in a modern browser
2. Choose a problem from the dropdown
3. Click **Run**
4. (Optional) Enable **Step-by-Step Narration**
5. Use **Pause / Resume / Next Step** controls to observe recursion clearly

---

## 🛠️ Technologies Used

* HTML5
* CSS
* JavaScript (ES Modules)
* HTML Canvas API

No external libraries required.

---

## 👥 Contributors

This is *Group 6*.

1.SadiqUmarAliyu-20232164
2.AhmedIbrahimMabudi-20230926
3.GodswillIkoedemAkpan-20231268
4. AbubakarBashirLargema-20233259
5.KhalidAhmedhamidu-241090174
6.Abba-YahayaAbdullahi-20230848
7.RidwanMahmoud-20232464
8.AbdulsamadMohammed-20230932
9.AhmadAminuAbubakar-20232370
10.ZakariMusa-20221363
11.ShafiuMuhammadMuttaka-20231005
12.FaisalMato-20233274

---

## ✅ Learning Outcomes

By using this project, students can:

* Understand recursion visually
* See why brute force is inefficient
* Learn how pruning improves performance
* Compare algorithms step by step
* Explain recursive problem solving confidently
