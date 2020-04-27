export const isRegistrationFull = function (value: string) {
    return /^\d{2}\s?([ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{2})\s?\d{6}$/i.test(value);
};
export const isDriverLicense = function (value: string) {
    return /^\d{2}\s?([ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{2})\s?\d{6}$/i.test(value);
};
export const isEmail = function (value: string) {
    return /^([a-z0-9_])(([-a-z0-9._])*([a-z0-9_]))*\@([a-z0-9])+([\.-]?[a-z0-9]+)*(\.[a-z]{2,})+$/i.test(value);
};
export const isPhone = function (value: string) {
    return /^[ ()+]*([0-9][ ()+-]*){11}$/.test(value);
};

export const isFio = function (value: string) {
    if (!value) {
        return false;
    }
    value = value.trim();
    var valid = /^\s*[а-яё]{2,}\s+[а-яё]{2,}\s+[а-яё]{2,}\s*$/i.test(value);

    value = value.toLowerCase();
    var fio = value.split(' ');
    if (valid) {
        list = [
            'Фамилия',
            'Имя',
            'Отчество'
        ];
        for (j = 0; j < fio.length; j++) {
            for (i = 0; i < list.length; i++) {
                v = list[i].toLowerCase();
                if (fio[j] == v) {
                    valid = false;
                    break;
                }
            }
        }
    }
    if (valid) {
        var list = [
            'МУП ',
            'ГУП ',
            'ФГУП ',
            'ООО',
            'ОАО',
            'ЗАО ',
            'ПАО '
        ];

        for (var j = 0; j < fio.length; j++) {
            if (fio[j].length > 30) {
                valid = false;
                break;
            }
            fio[j] = fio[j].trim() + ' ';
            for (var i = 0; i < list.length; i++) {
                var v = list[i].toLowerCase();
                if (fio[j].indexOf(v) != -1) {
                    valid = false;
                    break;
                }
            }
        }
    }
    if (valid) {
        var previousParts = [];
        for (i = 0; i < fio.length; i++) {
            if (fio[i].length > 1) {
                for (j = 0; j < previousParts.length; j++) {
                    if (fio[i] == previousParts[j]) {
                        return false;
                    }
                }
                previousParts[i] = fio[i];
            }
        }
    }
    return valid;
};
export const isAutoNumber = function (value: string) {
    return /^([0-9ABEKMHOPCTYXАВЕКМНОРСТУХ]{1}\d{3}[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{3})$/i.test(value);
};
export const isRegion = function (value: string) {
    return /^\d{1,3}$/.test(value);
};

