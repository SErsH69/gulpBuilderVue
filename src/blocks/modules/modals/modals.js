const Modals = class Modals {
    constructor({modalsSelector, modalsOpenerSelector, openedClass}){
        this.modalsSelector = modalsSelector;
        this.modalsOpenerSelector = modalsOpenerSelector;
        this.openedClass = openedClass;
    }
    modalCheck() {
        // Функция для проверки, активны ли оба чекбокса в модальном окне с классом modal_check
        function checkValidity() {
            const modal = document.querySelector('.modal_check');
            const checkbox1 = modal.querySelector('input[name="checkbox1"]');
            const checkbox2 = modal.querySelector('input[name="checkbox2"]');
            const submitBtn = modal.querySelector('input[type="submit"]');
    
            if (checkbox1.checked && checkbox2.checked) {
                submitBtn.disabled = false; // Если оба чекбокса отмечены, активируем кнопку submit
            } else {
                submitBtn.disabled = true; // Если хотя бы один чекбокс не отмечен, деактивируем кнопку submit
            }
        }
    
        // Функция для установки обработчиков событий для модального окна с классом modal_check
        function setupModalListeners() {
            const modal = document.querySelector('.modal_check');
            const checkbox1 = modal.querySelector('input[name="checkbox1"]');
            const checkbox2 = modal.querySelector('input[name="checkbox2"]');
    
            checkbox1.addEventListener('change', () => {
                checkValidity();
            });
    
            checkbox2.addEventListener('change', () => {
                checkValidity();
            });
        }
    
        // Вызываем функцию для установки обработчиков событий при загрузке страницы
        document.addEventListener('DOMContentLoaded', () => {
            setupModalListeners();
            checkValidity(); // Проверяем состояние чекбоксов при загрузке страницы
        });
    }
    openModal(id) {
        if (!document.querySelector(`[${this.modalsSelector}="${id}"]`)) return;
        document.querySelector(`[${this.modalsSelector}="${id}"]`).classList.add(this.openedClass);
    }
    closeModal(id) {
        if (!document.querySelector(`[${this.modalsSelector}="${id}"]`)) return;
        document.querySelector(`[${this.modalsSelector}="${id}"]`).classList.remove(this.openedClass);
        
        
        const modal = document.querySelector(`[${this.modalsSelector}="${id}"]`);
        if (!modal) return;
        const videos = modal.querySelectorAll('video');

        videos.forEach(video => {
            video.pause();
        });
    }
    addClickListener() {
        document.addEventListener('click', (event) => {
            if (event.target.dataset.modalId) {
                event.preventDefault();
                this.openModal(event.target.dataset.modalId);
            }
            if (!event.target.dataset.modalId && event.target.dataset.modal) {
                event.preventDefault();
                this.closeModal(document.querySelector(`[${this.modalsSelector}].isOpened`).dataset.modal);
            }
            if (event.target.closest('.modal__closer')) {
                event.preventDefault();
                this.closeModal(document.querySelector(`[${this.modalsSelector}].isOpened`).dataset.modal);
            }
        })
    }
    addKeyupListener() {
        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 27 && document.querySelector(`[${this.modalsSelector}].isOpened`)) {
                this.closeModal(document.querySelector(`[${this.modalsSelector}].isOpened`).dataset.modal);
            }
        })
    }
    init() {
        if (!this.modalsSelector && this.modalsOpenerSelector) return;
        this.addClickListener();
        this.addKeyupListener();
        this.modalCheck();
    }
}

export default Modals;