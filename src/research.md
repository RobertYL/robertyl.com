---
title: research
subtitle: what is multi-body dynamics?
layout: katex.njk
---

### three-body problem

Consider a system of three point masses $m_1 \geq m_2 \geq m_3$ moving in three
dimensions, subject to their mutual gravity, e.g., Earth–Moon–spacecraft. This
is the three-body problem (**3BP**).  Famously, this system has no general
closed-form solution; but there are some simplifications we can apply.

Suppose $m_3 \ll m_2$. Then the motion of $m_1$ and $m_2$ (the primaries) are
unaffected by the motion of $m_3$. With this, the system can be parameterized
with the parameter $\mu = \frac{m_2}{m_1+m_2}$ and becomes the restricted 3BP
(**R3BP**).

The evolution of two masses under their mutual gravity is well understood to be
the conic sections. If the primaries move in circular orbits, then we recover
the circular R3BP (**CR3BP**), where—after some frame changes—the motion of
$m_3$ is expressed by the equations
$$\begin{aligned}
    \ddot{x} &= 2\dot{y} + x + \partial_x U, \\\\
    \ddot{y} &= -2\dot{x} + y + \partial_y U, \\\\
    \ddot{z} &= \partial_z U,
\end{aligned}$$
where $U = \frac{(1-\mu)}{r_{13}} + \frac{\mu}{r_{23}}$ is the potential
function, $r_{i3}$ is the distance from mass $i$ to $m_3$, and $m_1$ and $m_2$
are fixed at $(-\mu, 0, 0)$ and $(1-\mu, 0, 0)$, respectively.

The rich dynamical structure of the CR3BP manifests as periodic, quasi-periodic,
and chaotic motion. My research focuses on understanding this structure.
