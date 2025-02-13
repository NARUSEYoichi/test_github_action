// 呼び出し方例
// promise = search_address('0000000')
// promise.then((response) => {
//         if (response.status == 200) {
//             ここに処理
//             address = response.results[0].address1
//         }
//     }
// ).catch((e) => {
//     エラー処理
//     console.log(e)
// })

async function search_address(zipcode, callback = null, limit = null) {
    /** 郵便番号から住所取得API実行
     * APIドキュメント: https://zipcloud.ibsnet.co.jp/doc/api
     * @param {zipcode} 郵便番号(必須)
     * @param {callback} JSONPで出力する際のコールバック関数名
     * @param {limit} 最大件数
     * @return jsonレスポンスデータ
     */

    const base_url = 'https://zipcloud.ibsnet.co.jp/api/search'
    // 郵便番号パラメータ
    let url = base_url + '?zipcode=' + zipcode

    // JSONPで出力する際のコールバック関数名パラメータ
    if (callback != null) {
        url = url + '&callback=' + callback
    }

    // 最大件数パラメータ
    if (limit != null) {
        url = url + '&limit=' + limit
    }
    response = await fetch(url)
    results = await response.json()
    return results
}

