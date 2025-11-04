# Band - Group Project
### [Link to Band Website](https://ezramemphis.github.io/Kandy-Krush/)

### Problems faced
Problem 1: Text not aligning to the center
We could not center the bio text even with 'text align: center'. After some Google search, we realize we need to define a margin in the css file so that a 'center' is defined.
``.container {
  padding: 20px;
  border-radius: 20px;
  background: radial-gradient(circle, #ff8fe1, #ffd903);
  width: 300px;
  text-align: center;
  margin: 20px auto; 
  border: #380c4c 3px solid;
}``

Problem 2: Making sound for every mouse click
I suggested this idea without knowing how to do it. We researched online and learned about 'Evenlistener' as a tool to fire specific actions (e.g. triggering an audio file). We also realizes the importance of 'planktonAudio.currentTime = 0;' which forces every click restart the firing. If the audio is still playing, clicking would have no effect or only result in overlapping sounds,
  

### Self-assessment
I mainly contributed to the programming for adding the 'ugly-plankton.mp3' audio effect to mouse clicks.

 ``<script>
        const planktonAudio = new Audio('ugly-plankton.mp3');
        document.addEventListener('click', () => {
            planktonAudio.currentTime = 0; // restart if already playing
            planktonAudio.play().catch(err => console.error('Audio play failed:', err));
        });
    </script>``

Besides, I suggested the band name spelling; added my own bio; and created the HYPER-Popcat gif on the website by adjusting the temperature, exposure, and other parameters


### Short assessments of your group members and the contributions they made
Mila: Created the music on website by stacking multiple hyperpop tracks; Wrote her bio; Suggested the theme of 'hyperpop', 
Ezra: Handled most of the programming: text alignment, textboxes for clarity, adding audio file, formatting, color gradient, debugging.
Cameron: Created band photos by gathering all our profile pictures and adding filter over it. Provided suggestions on the colors for majority of the designs; gathered font files and images.


