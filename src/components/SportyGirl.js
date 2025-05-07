import * as THREE from "three";

const SportyGirl = () => {
  // Create a group to hold all the parts of the girl
  const girlGroup = new THREE.Group();

  // Materials
  const materialBody = new THREE.MeshStandardMaterial({ color: 0xff69b4 }); // Pink for sporty attire
  const materialSkin = new THREE.MeshStandardMaterial({ color: 0xffe0bd }); // Skin tone

  // Torso - Wearing a sporty pink top
  const torsoGeometry = new THREE.BoxGeometry(0.5, 1, 0.3);
  const torso = new THREE.Mesh(torsoGeometry, materialBody);
  torso.position.set(0, 1.5, 0);
  girlGroup.add(torso);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
  const head = new THREE.Mesh(headGeometry, materialSkin);
  head.position.set(0, 2.25, 0);
  girlGroup.add(head);

  // Left Arm
  const leftArmGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
  const leftArm = new THREE.Mesh(leftArmGeometry, materialBody);
  leftArm.position.set(-0.4, 1.5, 0);
  girlGroup.add(leftArm);

  // Right Arm
  const rightArmGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
  const rightArm = new THREE.Mesh(rightArmGeometry, materialBody);
  rightArm.position.set(0.4, 1.5, 0);
  girlGroup.add(rightArm);

  // Left Leg - Wearing sporty leggings
  const leftLegGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
  const leftLeg = new THREE.Mesh(leftLegGeometry, materialBody);
  leftLeg.position.set(-0.15, 0.6, 0);
  girlGroup.add(leftLeg);

  // Right Leg - Wearing sporty leggings
  const rightLegGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
  const rightLeg = new THREE.Mesh(rightLegGeometry, materialBody);
  rightLeg.position.set(0.15, 0.6, 0);
  girlGroup.add(rightLeg);

  return girlGroup; // Return the group containing the girl
};

export default SportyGirl;