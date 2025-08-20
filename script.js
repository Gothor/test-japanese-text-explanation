document.addEventListener('DOMContentLoaded', () => {
  const lineSections = document.querySelectorAll('.line');
  for (let i = 0; i < lineSections.length; i++) {
    const lineSection = lineSections[i];
    lineSection.style.zIndex = (10000 - i);
  }
  
  const groupSections = document.querySelectorAll('.group');
  for (let i = 0; i < groupSections.length; i++) {
    const groupSection = groupSections[i];
    groupSection.dataset.id = "g" + (i + 1);
  }
  
  const wordSections = document.querySelectorAll('.word');
  for (let i = 0; i < wordSections.length; i++) {
    const wordSection = wordSections[i];
    wordSection.dataset.id = "w" + (i + 1);
  }
  
  const particleSections = document.querySelectorAll('.particle');
  for (let i = 0; i < particleSections.length; i++) {
    const particleSection = particleSections[i];
    particleSection.dataset.id = "p" + (i + 1);
  }
  
  const rubySections = document.querySelectorAll('.ruby');
  for (const rubySection of rubySections) {
    rubySection.addEventListener('click', e => {
      const ruby = e.currentTarget;
      ruby.classList.toggle('visible');
    });
  }

  const showFuriganaButton = document.querySelector('.show-furigana');
  showFuriganaButton.addEventListener('click', e => {
    for (const rubySection of rubySections) {
      rubySection.classList.add('visible');
    }
  });

  const hideFuriganaButton = document.querySelector('.hide-furigana');
  hideFuriganaButton.addEventListener('click', e => {
    for (const rubySection of rubySections) {
      rubySection.classList.remove('visible');
    }
  });
  
  const lines = [];
  const linkHolders = document.querySelectorAll('[data-referer-id]');
  for (const linkHolder of linkHolders) {
    linkHolder.addEventListener('mouseenter', e => {
      const label = e.target.dataset.linkLabel;
      const referer = document.querySelector('[data-id=' + e.target.dataset.refererId + ']');
      const referee = document.querySelector('[data-id=' + e.target.dataset.refereeId + ']');
      const startSocket = e.target.dataset.startSocket ?? 'bottom';
      const endSocket = e.target.dataset.endSocket ?? 'bottom';
      const line = new LeaderLine(
        referer,
        referee,
        {
          middleLabel: LeaderLine.captionLabel(label, {
            outlineColor: 'white',
            fontSize: '1.5em',
            strokeWidth: 10
          }),
          color: 'red',
          startSocket: startSocket,
          endSocket: endSocket,
          path: 'grid'
        }
      );
      referer.classList.add('active');
      referee.classList.add('active');
      lines.push(line);
    });
    
    linkHolder.addEventListener('mouseleave', () => {
      const linesToRemove = lines.splice(0);
      for (const line of linesToRemove) {
        line.start.classList.remove('active');
        line.end.classList.remove('active');
        line.remove();
      }
    });
  }
});