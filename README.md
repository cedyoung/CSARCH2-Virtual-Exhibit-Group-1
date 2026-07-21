# CSARCH2-Virtual-Exhibit-Group-1

## Title: Inside the ALU: How Computers Perform Arithmetic and Logic Operations

**Members:**
- Member 1: Corral, Matthew
- Member 2: De Castro, Jediaelle Denise
- Member 3: Del Mundo, Joshua
- Member 4: Fabricante, Jeruel
- Member 5: Young, Cedric

## Topic Theme:
The exhibit teaches how computers perform calculations — specifically that computers do not think the way humans do. Humans calculate abstractly; computers process everything as binary (0s and 1s) through physical circuits. The ALU is the component inside every CPU that does this work.

## The exhibit walks through five conceptual layers:

1. What the ALU is — a dedicated circuit inside the CPU that receives two binary inputs, applies an operation selected by the control unit, and outputs a binary result plus status flags (Zero, Carry, Overflow, Sign) that help the CPU make decisions like branching.

2. Binary representation — how numbers are encoded as bit patterns where each position carries a power-of-2 weight, so the human number 6 becomes 0110 in a 4-bit system.

3. The full operation set — ADD, SUB, AND, OR, XOR, NOT. The exhibit covers all six conceptually but focuses the simulator on the two arithmetic ones (ADD and SUB) because they involve the most interesting internal circuit behavior.

4. Adder circuit design — the heart of the exhibit. Two real circuit architectures are compared: Ripple Carry and Carry Lookahead (explained below).

5. Two's complement subtraction — how the ALU reuses its adder circuit to subtract by inverting B's bits and injecting a carry-in of 1, instead of needing a separate subtraction circuit.

The exhibit includes an interactive calculator called the **Mini ALU Simulator**, where users can enter numbers, choose an operation, and see how the ALU processes the result in binary form.


**Tech Stack Plan:**
| Part | Plan |
| ---- | ---- |
| Main framework | Astro 6 |
| Runtime | Node.js 26 |
| Content | MDX |
| Interactive component | React JSX |
| Styling | CSS / Astro scoped styles |
| Assets | PNG |
| Repository | GitHub |

## Proposed Interactive Element:
**Inputs**
Operand A and Operand B — each is a 4-bit binary number. Users click individual bit buttons to toggle them between 0 and 1. The decimal value updates live so users can see the connection between binary patterns and real numbers.

**Operation Selector**
ADD — passes A and B directly into the adder with carry-in = 0.
SUB — automatically inverts every bit of B (shown as ~B in the display) and sets carry-in = 1, performing two's complement subtraction through the same adder hardware.

**Adder Mode Selector**
This is the exhibit's key educational differentiator — two real circuit strategies:

**Carry Lookahead Adder (CLA)** — computes all carries simultaneously before any sum bits are calculated. It uses two pre-computed signals per bit: Generate (G = A AND B), meaning this bit will always produce a carry regardless of input carry, and Propagate (P = A OR B), meaning this bit will pass a carry through if one arrives. From G and P, all four carry values are derived in parallel using boolean formulas. The simulator exposes the G and P table so users can see these signals. Faster, but more complex circuitry.

**Output**
- A step view table showing A, the effective B (inverted if SUB), the carry-in values per bit position, and the resulting SUM bits — laid out the same way a hardware engineer would trace a circuit
- The binary result displayed as four lit bit cells
- The decimal equivalent of the result
- An overflow warning if the carry-out bit fires, indicating the true result exceeds the 4-bit range


**Simulator Flow**
- User enters Operand A and Operand B as 4-bit binary values
- User selects an operation ADD or SUB
- User selects an adder mode Ripple carry adder or Carry lookahead adder
- The simulator displays the carry values, binary result and decimal equivalent


**Description**
This revised proposal gives the Mini ALU Simulator a clearer and more realistic scope. Instead of attempting to cover many ALU operations vaguely, the exhibit will focus on addition and subtraction only. For both operations, users will be able to compare how a Ripple Carry Adder and a Carry Lookahead Adder process the same 4-bit inputs.

## Snapshot of Layout Design:
<img width="1917" height="726" alt="image" src="https://github.com/user-attachments/assets/e0e14c45-4b94-47c8-af5d-bccecf8cd9b6" />
<img width="1917" height="651" alt="image" src="https://github.com/user-attachments/assets/cd3107d8-32b7-4d63-a9e0-f1a2df854717" />
<img width="1917" height="722" alt="image" src="https://github.com/user-attachments/assets/17e2f232-39a5-4c71-886a-a294b14877ff" />
<img width="1917" height="762" alt="image" src="https://github.com/user-attachments/assets/22118a75-b0da-4735-85c0-5d567328db08" />
<img width="1917" height="742" alt="image" src="https://github.com/user-attachments/assets/4bfe8a72-cce7-40a8-89dd-a1a247052cdc" />
<img width="1917" height="682" alt="image" src="https://github.com/user-attachments/assets/a4d023cb-397b-43fb-9342-1556ec1c1987" />
<img width="1917" height="161" alt="image" src="https://github.com/user-attachments/assets/025f3011-a2d9-49af-b956-d602c0cf99b5" />
<img width="1911" height="752" alt="image" src="https://github.com/user-attachments/assets/23baf5c1-69d0-4802-bacc-c741a4fce63d" />
<img width="1917" height="267" alt="image" src="https://github.com/user-attachments/assets/f8aaedeb-f6d8-47c3-89eb-be4cd01a3761" />
<img width="1917" height="747" alt="image" src="https://github.com/user-attachments/assets/a9731648-8b5e-4763-9bda-def2a2d92ecf" />

## Disclosure on the Use of AI/LLM

Artificial Intelligence (AI) tools being used in the making of this project are **ChatGPT**, **Google Gemini** and **ClaudeAI**. The role of these AI tools in this project is they assist the members in productivity and act as a tool for learning and clarifying concepts. 

AI Tools are used for the following purposes: 
- Clarifying the concepts of Astro, MDX and React JSX and how to apply them properly in the project. 
- Explaining the ideas related to the concept of the Arithmetic Logic Unit. 
- Clarify how can Astro, MDX and React JSX can interact with one another in the code. 

All AI-generated suggestions were analyzed and reviewed prior to its utilization in the project. The project's final implementation, processes, design, deliverables and debugging were all taken care of and integrated by the members of this group. 

Link to Figma: https://www.figma.com/make/GDR34ZTPlb8ET8viaV19dM/Mini-ALU-Simulator?t=o8ehtl5ZBDA8LAcR-1
