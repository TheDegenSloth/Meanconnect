export default class AppSettings {
    public static CONSTANTS = {
        apiURL: 'http://localhost:3000/api/',
        scope: ['login', 'vote', 'comment', 'delete_comment', 'comment_options', 'custom_json', 'claim_reward_balance'],
    };

    public static apiUrl(type) {
        return this.CONSTANTS.apiURL + type;
    }
}
