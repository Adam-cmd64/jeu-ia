// Dessin du décor, du panier et des objets. Tout est tracé au canvas.

const etoiles = [];
for (let i = 0; i < 64; i++) {
  etoiles.push({ x: Math.random() * LARGEUR, y: Math.random() * HAUTEUR * 0.6, taille: Math.random() + 0.5, phase: Math.random() * 6.28 });
}
function dessinerFond(ctx, temps) {
  const degrade = ctx.createLinearGradient(0, 0, 0, HAUTEUR);
  degrade.addColorStop(0, "#170b32");
  degrade.addColorStop(0.52, COULEURS.fond);
  degrade.addColorStop(1, "#02010a");
  ctx.fillStyle = degrade;
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);

  const horizon = HAUTEUR * 0.58;
  const halo = ctx.createRadialGradient(LARGEUR / 2, horizon, 4, LARGEUR / 2, horizon, LARGEUR * 0.8);
  halo.addColorStop(0, "rgba(255, 62, 165, 0.2)");
  halo.addColorStop(0.5, "rgba(122, 92, 255, 0.07)");
  halo.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);

  for (const etoile of etoiles) {
    const lueur = 0.2 + 0.4 * Math.abs(Math.sin(temps + etoile.phase));
    ctx.fillStyle = "rgba(245, 247, 255, " + lueur + ")";
    ctx.fillRect(etoile.x, etoile.y, etoile.taille, etoile.taille);
  }

  ctx.strokeStyle = COULEURS.grille;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -9; i <= 9; i++) {
    ctx.moveTo(LARGEUR / 2, horizon);
    ctx.lineTo(LARGEUR / 2 + i * 78, HAUTEUR);
  }
  ctx.stroke();
  for (let i = 0; i < 14; i++) {
    const avancee = (i + (temps * 0.3) % 1) / 14;
    const y = horizon + Math.pow(avancee, 2.3) * (HAUTEUR - horizon);
    ctx.globalAlpha = 0.12 + avancee * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(LARGEUR, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.shadowColor = COULEURS.magenta;
  ctx.shadowBlur = 16;
  ctx.strokeStyle = "rgba(255, 62, 165, 0.5)";
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(LARGEUR, horizon);
  ctx.stroke();
  ctx.restore();
}
function dessinerPanier(ctx, panier, temps) {
  const inclinaison = Math.max(-0.2, Math.min(0.2, panier.vitesse * 0.00025));
  const pulsation = 0.6 + 0.4 * Math.sin(temps * 6);
  ctx.save();
  ctx.translate(panier.x + panier.largeur / 2, panier.y + panier.hauteur / 2);
  ctx.rotate(inclinaison);
  ctx.shadowColor = COULEURS.cyan;
  ctx.shadowBlur = 26;
  ctx.fillStyle = "rgba(40, 240, 255, 0.16)";
  ctx.beginPath();
  ctx.roundRect(-panier.largeur / 2, -panier.hauteur / 2, panier.largeur, panier.hauteur, 8);
  ctx.fill();
  ctx.shadowBlur = 10;
  ctx.strokeStyle = COULEURS.cyan;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.shadowColor = COULEURS.magenta;
  ctx.shadowBlur = 16 * pulsation;
  ctx.fillStyle = COULEURS.magenta;
  ctx.fillRect(-panier.largeur * 0.17, -2, panier.largeur * 0.34, 4);
  ctx.fillStyle = "rgba(40, 240, 255, 0.6)";
  ctx.fillRect(-panier.largeur * 0.32, panier.hauteur / 2, 10, 3);
  ctx.fillRect(panier.largeur * 0.32 - 10, panier.hauteur / 2, 10, 3);
  ctx.restore();
}
function dessinerCristal(ctx, objet, temps) {
  const r = objet.rayon;
  const dore = objet.type === DORE;
  const glace = objet.type === GLACE;
  const couleur = dore ? COULEURS.or : glace ? COULEURS.glace : COULEURS.cyan;
  const battement = 1 + 0.06 * Math.sin(temps * 5 + objet.pulsation);
  ctx.scale(battement, battement);
  ctx.shadowColor = couleur;
  ctx.shadowBlur = 20;
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  if (dore) {
    // trophee : une coupe, un pied et un socle
    ctx.fillStyle = "rgba(255, 209, 102, 0.3)";
    ctx.beginPath();
    ctx.moveTo(-r * 0.8, -r);
    ctx.lineTo(r * 0.8, -r);
    ctx.lineTo(r * 0.4, 0);
    ctx.lineTo(-r * 0.4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(-r * 0.12, 0, r * 0.24, r * 0.6);
    ctx.strokeRect(-r * 0.5, r * 0.6, r, r * 0.3);
    return;
  }
  // ballon : un cercle avec un pentagone blanc au centre
  ctx.rotate(objet.rotation);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = glace ? "rgba(234, 246, 255, 0.45)" : "rgba(40, 240, 255, 0.2)";
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = COULEURS.blanc;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = i * Math.PI * 2 / 5 - Math.PI / 2;
    ctx.lineTo(Math.cos(angle) * r * 0.4, Math.sin(angle) * r * 0.4);
  }
  ctx.closePath();
  ctx.fill();
}
function dessinerBombe(ctx, objet, temps) {
  // voiture adverse : carrosserie, cabine et deux roues
  const r = objet.rayon * (1 + 0.06 * Math.sin(temps * 9 + objet.pulsation));
  ctx.rotate(Math.sin(objet.rotation) * 0.3);
  ctx.shadowColor = COULEURS.rouge;
  ctx.shadowBlur = 22;
  ctx.fillStyle = "#1a0614";
  ctx.strokeStyle = COULEURS.rouge;
  ctx.lineWidth = 2;
  ctx.fillRect(-r * 1.3, -r * 0.4, r * 2.6, r * 0.8);
  ctx.strokeRect(-r * 1.3, -r * 0.4, r * 2.6, r * 0.8);
  ctx.strokeStyle = COULEURS.magenta;
  ctx.strokeRect(-r * 0.6, -r * 0.9, r * 1.1, r * 0.5);
  ctx.fillStyle = COULEURS.rouge;
  ctx.beginPath();
  ctx.arc(-r * 0.75, r * 0.45, r * 0.32, 0, Math.PI * 2);
  ctx.moveTo(r * 1.07, r * 0.45);
  ctx.arc(r * 0.75, r * 0.45, r * 0.32, 0, Math.PI * 2);
  ctx.fill();
}
function dessinerObjet(ctx, objet, temps) {
  ctx.save();
  ctx.translate(objet.x, objet.y);
  if (objet.type === BOMBE) dessinerBombe(ctx, objet, temps);
  else dessinerCristal(ctx, objet, temps);
  ctx.restore();
}
