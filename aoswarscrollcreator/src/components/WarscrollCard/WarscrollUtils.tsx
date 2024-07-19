import { RangedWeaponStats } from "../Weapons/RangedWeapons";
import { MeleeWeaponStats } from "../Weapons/MeleeWeapons";
import { Ability } from "../Abilities/Abilities";

import "../styles.css";

const warscrollTitleCharPerLine = 20;
const loadoutBodyCharPerLine = 42;
const loadoutBodyFontSize = 16;
const factionTitleFontSize = 12;
const warscrollNameFontSize = 30;
const wpnBannerPosX = 10;
const wpnBannerPosY = 200;
const wpnHeaderYPos = 215;
const textPosY = 232;

export const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  ctx.globalAlpha = 1;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

export const drawTextOnCanvas = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  alignment: CanvasTextAlign,
  fontColor: string
) => {
  ctx.font = fontSize.toString() + "px Minion Pro";
  ctx.fillStyle = fontColor;
  ctx.textAlign = alignment;
  ctx.globalAlpha = 1;
  ctx.fillText(text, x, y); // Change the coordinates as needed
  ctx.strokeText;
};

const splitTextToLines = (charLimit: number, text: string): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if ((currentLine + word).length <= charLimit) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

export const drawAbilityOnCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  abilities: Ability[],
  loadoutBody: string,
  loadoutPoints: string[],
  yAnchor: number
) => {
  const xAnchorL = 25;
  const xAnchorR = canvas.width / 2 + 5;
  //const yAnchord = 400;
  const canvasWidth = canvas.width / 2 - 50;
  ctx.globalAlpha = 1;
  yAnchor += 20;

  for (let i = 0; i < abilities.length; i++) {
    const img = new Image();
    img.src = abilities[i].ability_banner;

    console.log("loadoutBody: " + loadoutBody);
    // Draw this first.
    if (loadoutBody.length > 0) {
      if (loadoutBody.length >= loadoutBodyCharPerLine) {
        const lines = splitTextToLines(loadoutBodyCharPerLine, loadoutBody);
        // Draw each line of loadout body
        for (let i = 0; i < lines.length; i++) {
          ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
          yAnchor += 20;
          drawTextOnCanvas(ctx, lines[i], xAnchorL, yAnchor, loadoutBodyFontSize, "left", "black");
        }
      }
      // If there is only one line, default to this.
      else {
        yAnchor += 20;
        drawTextOnCanvas(ctx, loadoutBody, xAnchorL, yAnchor, loadoutBodyFontSize, "left", "black");
      }

      if (loadoutPoints.length > 0) {
        for (let i = 0; i < loadoutPoints.length; i++) {
          yAnchor += 20;
          drawTextOnCanvas(
            ctx,
            "   •  " + loadoutPoints[i],
            xAnchorL,
            yAnchor,
            loadoutBodyFontSize,
            "left",
            "black"
          );
        }
      }
    }

    img.onload = () => {
      // Draw any loadout info first

      // Determine anchor position

      ctx.strokeStyle = abilities[i].ability_line_color;
      ctx.lineWidth = 2;
      ctx.strokeRect(xAnchorR + 5 + (i + 1) * 10, yAnchor + 5 + (i + 1) * 10, canvasWidth - 10, 100);
      ctx.drawImage(img, xAnchorR + (i + 1) * 10, yAnchor + (i + 1) * 10, canvasWidth, 20);
    };
  }
};

// for (let i = 0; i < abilities.length; i++) {
//
//   img.src = abilities[i].abilitiesBanner;
// }
// image.onload = () => {
//   ctx.drawImage(image, xAnchorL, yAnchor, canvasWidth, 20);
//   ctx.strokeStyle = "darkgreen";
//   ctx.lineWidth = 2;
//   ctx.strokeRect(xAnchorL + 5, yAnchor + 5, canvasWidth - 10, 100);
// };
// }
// image.onload = () => {
// ctx.drawImage(image, xAnchorR, yAnchor, canvasWidth, 20);
// ctx.strokeStyle = "darkgreen";
// ctx.lineWidth = 2;
// ctx.strokeRect(xAnchorR + 5, yAnchor + 5, canvasWidth - 10, 100);
// };

export const drawWeaponsOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  rangedWeapons: RangedWeaponStats[],
  meleeWeapons: MeleeWeaponStats[]
) => {
  const width = 640;
  let height = 20;
  ctx.globalAlpha = 1;
  let textOffset = 1;
  let imageOffset = 20;
  let mWpnBannerYPos = wpnBannerPosY;
  let lineCount = 1;
  let yAnchor = textPosY + 10;
  /* Draw out ranged weapon text */
  if (rangedWeapons.length > 0 || meleeWeapons.length > 0) {
    ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY, width, height);

    // If we have ranged weapons
    if (rangedWeapons.length > 0) {
      /* If we have ranged weapons, increment the melee weapon value so if we
          add melee weapons, they'll position corrctly. */
      drawTextOnCanvas(ctx, "RANGED WEAPONS", 110, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Rng", 240, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Atk", 280, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Hit", 320, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Wnd", 360, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Rnd", 400, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Dmg", 440, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Ability", 550, wpnHeaderYPos, 12, "center", "white");

      for (let i = 0; i < rangedWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (rangedWeapons[i].name.length > 28) {
          isDoubleSpaced = true;
          height += 20;
          console.log("Ranged Weapon Height: " + height);
          const lines = splitTextToLines(27, rangedWeapons[i].name);
          // If they are, draw them double spaced.
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(ctx, lines[i], 111, textPosY + tempOffset, 14, "center", "black");
            tempOffset += 18;
          }
          //
        } else {
          drawTextOnCanvas(ctx, rangedWeapons[i].name, 111, textPosY + textOffset, 14, "center", "black");
        }
        drawTextOnCanvas(ctx, rangedWeapons[i].range, 240, textPosY + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, rangedWeapons[i].atk, 280, textPosY + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, rangedWeapons[i].toHit, 320, textPosY + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, rangedWeapons[i].toWound, 360, textPosY + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, rangedWeapons[i].rend, 400, textPosY + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, rangedWeapons[i].damage, 440, textPosY + textOffset, 12, "center", "black");

        // Check if the Abilities are double long enough to be double spaced/
        if (rangedWeapons[i].ability.length > 28) {
          // Check if we're already double spaced. If we are, we don't need to change the offset.
          if (!isDoubleSpaced) {
            isDoubleSpaced = true;
            height += 20;
          }

          const lines = splitTextToLines(29, rangedWeapons[i].ability);
          let tempOffset = textOffset;
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(ctx, lines[i], 550, textPosY + tempOffset, 14, "center", "black");
            tempOffset += 18;
          }
          //
        } else {
          drawTextOnCanvas(ctx, rangedWeapons[i].ability, 550, textPosY + textOffset, 14, "center", "black");
        }
        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.3;
        }

        // Finally, draw our image
        ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height);

        /* If we're double spacd, add extra offset, but reduce the height as the next 
        line is assumed to be single space. */
        if (isDoubleSpaced) {
          height -= 20;
          textOffset += 20;
          imageOffset += 20;
          lineCount += 1;
        }
        textOffset += 20;
        imageOffset += 20;
        lineCount += 1;
        yAnchor += textOffset;
      }
    }
    // If we have melee weapons
    if (meleeWeapons.length > 0) {
      let mBannerTextPos = wpnHeaderYPos;
      let mTextPos = wpnHeaderYPos;
      textOffset = 0;
      console.log("Height at Start: " + height);
      // If we have ranged weapon, increment the text by the current line count.
      if (rangedWeapons.length > 0) {
        mWpnBannerYPos += 20 * lineCount;
        mBannerTextPos += 20 * lineCount;
        mTextPos += 20 * lineCount;
        imageOffset += 20;
      }
      mTextPos += 20;
      ctx.globalAlpha = 1;
      ctx.drawImage(image, wpnBannerPosX, mWpnBannerYPos, width, height);

      // Draw Melee Header Text
      drawTextOnCanvas(ctx, "MELEE WEAPONS", 110, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Atk", 280, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Hit", 320, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Wnd", 360, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Rnd", 400, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Dmg", 440, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(ctx, "Ability", 550, mBannerTextPos, 12, "center", "white");

      for (let i = 0; i < meleeWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (meleeWeapons[i].name.length > 28) {
          isDoubleSpaced = true;
          height += 20;
          const lines = splitTextToLines(28, meleeWeapons[i].name);
          // If they are, draw them double spaced.
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(ctx, lines[i], 111, mTextPos + (i + 2) + tempOffset, 14, "center", "black");
            tempOffset += 18;
          }
          //
        } else {
          drawTextOnCanvas(ctx, meleeWeapons[i].name, 111, mTextPos + textOffset, 14, "center", "black");
        }
        drawTextOnCanvas(ctx, meleeWeapons[i].atk, 280, mTextPos + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, meleeWeapons[i].toHit, 320, mTextPos + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, meleeWeapons[i].toWound, 360, mTextPos + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, meleeWeapons[i].rend, 400, mTextPos + textOffset, 12, "center", "black");
        drawTextOnCanvas(ctx, meleeWeapons[i].damage, 440, mTextPos + textOffset, 12, "center", "black");

        // Check if the Abilities are double long enough to be double spaced/
        if (meleeWeapons[i].ability.length > 28) {
          // Check if we're already double spaced. If we are, we don't need to change the offset.
          if (!isDoubleSpaced) {
            isDoubleSpaced = true;
            height += 20;
          }
          let tempOffset = textOffset;
          const lines = splitTextToLines(28, meleeWeapons[i].ability);
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(ctx, lines[i], 550, mTextPos + (i + 1) + tempOffset, 14, "center", "black");
            tempOffset += 18;
          }
        } else {
          drawTextOnCanvas(ctx, meleeWeapons[i].ability, 550, mTextPos + textOffset, 14, "center", "black");
        }
        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.3;
        }
        // Finally, draw our image
        ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height);

        /* If we're double spacd, add extra offset, but reduce the height as the next 
        line is assumed to be single space. */
        if (isDoubleSpaced) {
          height -= 20;
          textOffset += 20;
          imageOffset += 20;
          lineCount += 1;
        }
        textOffset += 20;
        imageOffset += 20;
        lineCount += 1;
      }
    }
    yAnchor = imageOffset + wpnBannerPosY;
  }
  return yAnchor; // Return the updated yAnchor
};

export const drawWarscrollTitleTextOnCanvas = (
  ctx: CanvasRenderingContext2D,
  factionText: string,
  warscrollName: string,
  subtitle: string,
  y: number
) => {
  const offset = 75;
  const x = ctx.canvas.width / 2 + offset;
  ctx.textAlign = "center";
  ctx.globalAlpha = 1;
  ctx.font = warscrollNameFontSize.toString() + "px Minion Pro";
  ctx.fillStyle = "white";

  if (warscrollName.length >= warscrollTitleCharPerLine) {
    const lines = splitTextToLines(warscrollTitleCharPerLine, warscrollName);
    // Draw each line of warscrollName
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y - 10 + i * warscrollNameFontSize);
    }
    ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    ctx.fillText(subtitle, x, y + 40);
    ctx.fillText(factionText, x, y - 45);
  }
  // If there is only one line, default to this.
  else {
    ctx.fillText(warscrollName, x, y);
    ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    ctx.fillText(subtitle, x, y + 20);
    ctx.fillText(factionText, x, y - 35);
  }
};
