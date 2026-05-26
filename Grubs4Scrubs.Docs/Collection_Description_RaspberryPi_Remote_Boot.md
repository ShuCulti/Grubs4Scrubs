# Raspberry Pi Remote Boot Setup

## Introduction

This is a side project I'm doing for my brother. The problem is simple: he needs to be able to turn on his desktop PC when he's not physically there. Maybe he's at work and forgot to leave it running, or he needs to grab a file from it remotely. Walking home to press a power button isn't really an option.

The solution uses a Raspberry Pi 3 running Tailscale, sitting on the same local network as the desktop. Tailscale is a mesh VPN that lets me reach the Pi from anywhere without messing with port forwarding or exposing anything to the open internet. Once I'm connected to the Pi, it sends a Wake-on-LAN magic packet across the local network to the desktop's motherboard, which boots the machine up. From there my brother can remote in through whatever remote desktop tool he prefers.

The Pi doesn't need to be physically connected to the desktop at all. It just needs to be on the same network so the WoL packet can reach the desktop's network card. The whole setup runs headless (no monitor, no keyboard on the Pi) and stays on 24/7 since a Pi 3 draws almost no power.

I'm building this as a personal project, but it doubles as extra portfolio evidence for Semester 2. It shows I can work with hardware, networking, and Linux outside the typical web development scope of the individual and group projects.

The stakeholders here are my brother (the end user who actually needs this working) and myself (the one setting it up and learning from it).

## Project progress

### Sprint 1: Research and Setup

[NOTE: Fill this in with what you've done so far. Things to mention: flashing Raspbian onto the SD card, initial Pi setup (SSH enabled, headless config), installing Tailscale, getting it connected to your Tailscale network, testing SSH access from outside the local network. Also mention any research you did on Wake-on-LAN (how magic packets work, enabling WoL in the desktop's BIOS/UEFI, installing etherwake or wakeonlan on the Pi). If you ran into issues (SD card formatting, Wi-Fi drivers, Tailscale auth), mention those too since they're good learning evidence.]

### Sprint 2: WoL Implementation and Testing

[NOTE: Fill this in once you've got the actual WoL working. Cover: which WoL tool you installed on the Pi (etherwake, wakeonlan), how you found the desktop's MAC address, the command you use to send the magic packet, whether you scripted it or just run it manually, and testing results (did it boot on the first try? did you need to tweak BIOS settings?). If you set up a simple bash script or cron job, mention that.]

### Sprint 3: Hardening and Handoff

[NOTE: Fill this in once the project is "done." Cover: any security steps (Tailscale ACLs, SSH key-only auth, disabling password login on the Pi), making it reliable (auto-start Tailscale on boot, what happens after a power outage), and handing it off to your brother (did you write him a quick guide? did you show him how to use it?). This is where the LO6 reflection lives too, what you learned from doing a hardware/networking project vs your usual web dev work.]
