export function unmountGlobalLoading() {
  const wrapper = document.querySelector("#loading-wrapper")

  if (wrapper) {
    wrapper.classList.add("hidden")

    wrapper.addEventListener(
      "transitionend",
      () => {
        document.getElementById("loader-style")?.remove()
        document.getElementById("loading-script")?.remove()
        wrapper.remove()
      },
      { once: true }
    )
  }
}
