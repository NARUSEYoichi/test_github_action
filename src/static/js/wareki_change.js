/**
 * 和暦から西暦へ変換
 * @param {string} name 和暦の名称
 * @param {number} year 変換する和暦
 * @return {number|false} 変換された西暦を返す
 */
var JCToAD = function (name, year) {
    if (!name || !year) return false;

    if (typeof year === 'string') {
        year = Number(year.replace('年', ''));
    }

    if (typeof year !== 'number' || year === NaN) return false;
    if (year <= 0) return false;

    /**
     * 和暦の一覧
     * @property {string} object.name 和暦名
     * @property {number|false} object.year 年数（不明の場合はfalse）
     * ※平成、昭和は年数が分かっているが、データ的(資格の有効期限等)で実際存在しない年数を入れる場合もあるためFalseに設定
     * @property {number} object.startYear 和暦が開始された前年の値
     */
    var data = [
        {
            name: '令和',
            year: false,
            startYear: 2018
        },
        {
            name: '平成',
            year: false,
            startYear: 1988
        },
        {
            name: '昭和',
            year: false,
            startYear: 1925
        },
        {
            name: '大正',
            year: 15,
            startYear: 1911
        },
        {
            name: '明治',
            year: 45,
            startYear: 1867
        },
        {
            name: '慶応',
            year: 4,
            startYear: 1864
        }
    ];

    for (var i = 0, len = data.length; i < len; i++) {
        if ((name === data[i].name) && (data[i].year === false || year <= data[i].year)) {
            return data[i].startYear + year;
        }
    }

    return false;
};

function get_ad() {
    let wareki_reki = this.element.closest('.modal-body').querySelector('select[name="wareki_reki"]');
    let wareki_year = this.element.closest('.modal-body').querySelector('input[name="wareki_year"]');
    let wareki_month = this.element.closest('.modal-body').querySelector('input[name="wareki_month"]');
    let wareki_day = this.element.closest('.modal-body').querySelector('input[name="wareki_day"]');

    seireki_message = this.element.closest('.modal-content').querySelector('p[name="seireki_message"]');

    btn_wareki_change_apply = this.element.closest('.modal-content').querySelector('button[name="btn-wareki-change-apply"]');

    err_message = this.element.closest('.modal-content').querySelector('p[name="err_message"]');
    if (!wareki_year.value || !wareki_month.value || !wareki_day.value) {
        err_message.textContent = '年、月、日を入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return
    }
    ;

    if (!/^[\x20-\x7e]*$/.test(wareki_year.value)) {
        err_message.textContent = '年は半角で入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return
    }
    ;

    if (!/^[\x20-\x7e]*$/.test(wareki_month.value)) {
        err_message.textContent = '月は半角で入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return
    }
    ;

    if (!/^[\x20-\x7e]*$/.test(wareki_day.value)) {
        err_message.textContent = '日は半角で入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return
    }
    ;

    if (!$.isNumeric(wareki_year.value)) {
        err_message.textContent = '年は数値を入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return

    }

    if (!$.isNumeric(wareki_month.value)) {
        err_message.textContent = '月は数値を入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return

    }

    if (!$.isNumeric(wareki_day.value)) {
        err_message.textContent = '日は数値を入力してください';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return

    }


    seireki = JCToAD(wareki_reki.value, wareki_year.value);
    seireki_message = this.element.closest('.modal-content').querySelector('p[name="seireki_message"]');

    let str_date = `${seireki}/${wareki_month.value}/${wareki_day.value}`;
    let date = new Date(str_date)

    if (isNaN(date.getDate())) {
        err_message.textContent = '不正な日付です';
        seireki_message.textContent = "";
        btn_wareki_change_apply.setAttribute("disabled", "disabled");
        return
    }
    ;

    seireki_message.textContent = `${seireki}年${wareki_month.value}月${wareki_day.value}日`;
    err_message.textContent = "";

    btn_wareki_change_apply.removeAttribute("disabled");

}

let wareki_reki = document.querySelectorAll('select[name="wareki_reki"],input[name="wareki_year"],input[name="wareki_month"],input[name="wareki_day"]');
wareki_reki.forEach((element) => {
    element.addEventListener('change', {
        element: element,
        handleEvent: get_ad
    })
});

let btn_wareki_change_apply = document.querySelectorAll('button[name="btn-wareki-change-apply"]');

btn_wareki_change_apply.forEach((element) => {
    element.addEventListener('click', {
        element: element,
        handleEvent: apply_ad
    })
});

function apply_ad() {
    const apply_target_name = this.element.getAttribute("apply-target");
    apply_target = document.querySelector(apply_target_name);

    let wareki_reki = this.element.closest('.modal-footer').closest('.modal-content').querySelector('select[name="wareki_reki"]');
    let wareki_year = this.element.closest('.modal-footer').closest('.modal-content').querySelector('input[name="wareki_year"]');
    let wareki_month = this.element.closest('.modal-footer').closest('.modal-content').querySelector('input[name="wareki_month"]');
    let wareki_day = this.element.closest('.modal-footer').closest('.modal-content').querySelector('input[name="wareki_day"]');

    seireki = JCToAD(wareki_reki.value, wareki_year.value);

    apply_target.value = `${seireki}-${wareki_month.value.padStart(2, '0')}-${wareki_day.value.padStart(2, '0')}`;
};
