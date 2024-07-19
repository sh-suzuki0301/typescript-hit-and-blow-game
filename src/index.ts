// テキストの出力
const printline = (text: string, breakline: boolean = true) => {
  process.stdout.write(text + (breakline ? '\n' : ''))
}

// ユーザー入力値
const promptInput = async (text: string) => {
  printline(`\n${text}\n>`, false)
  const input: string = await new Promise((resolve) => process.stdin.once('data', (data) =>
    resolve(data.toString())))
  return input.trim()
}

class HitAndBlow {
    answerSource: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    answer: string[] = []
    tryCount: number  = 0

    setting() {
      const answerLength = 3

      while (this.answer.length < answerLength) {
        const randMum = Math.floor(Math.random() * this.answerSource.length)
        const slectedItem = this.answerSource[randMum]
        if (!this.answer.includes(slectedItem)) {
          this.answer.push(slectedItem)
        }
      }
    }

    async play() {
      const inputArr = (await promptInput('「,」区切りで3つの数字を入力してください')).split(',')
      const result = this.check(inputArr)

      if (result.hit !== this.answer.length) {
        // 不正解だったら続ける
        printline(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
        this.tryCount += 1
        await this.play()
      } else {
        // 正解だったら完了
        this.tryCount += 1
      }
    }

    check (input: string[]) {
      let hitCount = 0
      let blowCount = 0

      input.forEach((val, index) => {
        if (val === this.answer[index]) {
          hitCount += 1
        } else if (this.answer.includes(val)) {
          blowCount += 1
        }
      })

      return {
        hit: hitCount,
        blow: blowCount,
      }
    }
}

(async () => {
  // const name = await promptInput('名前を入力してください')
  // console.log(name)
  // const age = await promptInput('年齢を入力してください')
  // console.log(age)
  // process.exit()
  const hitAndBlow = new HitAndBlow()
  hitAndBlow.setting()
  await hitAndBlow.play()
})()