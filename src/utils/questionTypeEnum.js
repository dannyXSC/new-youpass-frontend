export default class QuestionTypeEnum {
    static SingleChoice = new QuestionTypeEnum('单选题');
    static MultiChoice = new QuestionTypeEnum('多选题');
    static Filling = new QuestionTypeEnum('填空题');
    static BigQuestion = new QuestionTypeEnum('大题');
    static NoQuestion = new QuestionTypeEnum('未知题型');

    constructor(value) {
        this.value = value
    }

    static getInstance(questionSymbol) {
        switch (questionSymbol) {
            case 0:
                return QuestionTypeEnum.SingleChoice;
            case 1:
                return QuestionTypeEnum.MultiChoice;
            case 2:
                return QuestionTypeEnum.Filling;
            case 3:
                return QuestionTypeEnum.BigQuestion;
            default:
                return QuestionTypeEnum.NoQuestion;
        }
    }
}