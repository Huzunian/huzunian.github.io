const converted = {
  ".dropdown": { position: "relative", display: "inline-block" },
  ".dropdown-toggle::after": {
    content: "''",
    display: "inline-block",
    marginLeft: "5px",
    verticalAlign: "3px",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent"
  },
  ".dropdown-menu": {
    position: "absolute",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
    top: "100%",
    left: "0",
    zIndex: 999,
    border: "1px solid rgba(0, 0, 0, 0.15)",
    borderRadius: "4px",
    backgroundColor: "#fff",
    minWidth: "100%",
    padding: "10px 0"
  },
  ".dropdown-menu--active": { opacity: 1, visibility: "visible" },
  ".dropdown-menu__link": {
    display: "block",
    margin: "0",
    padding: ["0", "7px 10px"],
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    textDecoration: "none",
    color: "black"
  },
  ".dropdown-menu__link--active": {
    backgroundColor: "rgba(0, 0, 0, 0.5) !important"
  },
  ".dropdown-menu__link:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" }
}


(function dropdown() {
	const triggers = document.querySelectorAll('[data-dd-target]');

	let index = -1,
		isOpened = false,
		focusedEl = '';

	function toggleClass(element, className) {

		if (element.classList.contains(className)) {
			setTimeout(() => {
				element.classList.remove(className);
				isOpened = false;
			});
		} else {
			setTimeout(() => {
				element.classList.add(className);
				isOpened = true;
			});
		}
	}

	function deleteActiveClassInArr(arr, className) {
		for (let i = 0; i < arr.length; i++) {
			arr[i].classList.remove(className);
		}
	}

	function addActiveClassMenuEl(arr, className) {
		deleteActiveClassInArr(arr, className);
		arr[index].classList.add(className);
	}

	function closeMenu(menu, activeClass) {
		index = -1;
		isOpened = false;
		menu.classList.remove(activeClass);
	}

	triggers.forEach(trigger => {
		const path = trigger.getAttribute('data-dd-target'),
			menu = document.querySelector(`[data-dd-path="${path}"]`),
			menuItems = menu.querySelectorAll('.dropdown-menu__link'),
			lastItem = menuItems[menuItems.length - 1];

		menuItems.forEach(item => {
			item.addEventListener('focus', (e) => {
				focusedEl = e.target;
			});

			item.addEventListener('keydown', (e) => {
				if (e.code === 'Enter' && e.target === focusedEl) {
					closeMenu(menu, 'dropdown-menu--active');
				}

				if (e.code === 'Escape' && focusedEl) {
					closeMenu(menu, 'dropdown-menu--active');
					trigger.focus();
				}
			});
		});

		document.addEventListener('click', (e) => {
			const target = e.target;

			if (target && target === trigger) {
				e.preventDefault();
				toggleClass(menu, 'dropdown-menu--active');
			}

			if (target && !(target == menu || target.classList.contains('dropdown-menu__link'))) {
				index = -1;
				closeMenu(menu, 'dropdown-menu--active');
				deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');
			}
		});

		lastItem.addEventListener('blur', () => {
			closeMenu(menu, 'dropdown-menu--active');
		});

		trigger.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				closeMenu(menu, 'dropdown-menu--active');
				deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');
			}

			if (isOpened && menuItems.length > 0) {
				switch (e.code) {
					case 'ArrowUp':
						index--;
						if (index < 0) {
							index = menuItems.length - 1;
						}
						addActiveClassMenuEl(menuItems, 'dropdown-menu__link--active');
						break;

					case 'ArrowDown':
						index++;
						if (index > menuItems.length - 1) {
							index = 0;
						}
						addActiveClassMenuEl(menuItems, 'dropdown-menu__link--active');
						break;

					case 'Enter':
						deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');

						if (index > -1) {
							menuItems[index].click();
						}
						break;
				}
			}
		});
	});
}());
