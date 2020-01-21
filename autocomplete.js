const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input type="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async (event) => {
    if (event.target.value.length <= 0) {
      dropdown.classList.remove('is-active');
      return;
    } else {
      const items = await fetchData(event.target.value);

      resultsWrapper.innerHTML = '';
      dropdown.classList.add('is-active');

      items.map((item) => {
        const option = document.createElement('a');

        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);

        option.addEventListener('click', () => {
          dropdown.classList.remove('is-active');
          input.value = inputValue(item);
          onOptionSelect(item);
        });

        resultsWrapper.appendChild(option);

        return item;
      });
    }
  };

  input.addEventListener('input', debounce(onInput, 1000));
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
