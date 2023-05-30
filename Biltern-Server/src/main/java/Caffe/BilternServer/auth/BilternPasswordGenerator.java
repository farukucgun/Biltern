package Caffe.BilternServer.auth;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import static org.springframework.beans.MethodInvocationException.ERROR_CODE;

/**
 * This is the service class for the random generation of passwords to ensure system security
 */


@ConfigurationProperties(prefix = "password-generation")
@Service
public class BilternPasswordGenerator {

    private final int specialCharCount = 1;
    private final String specialChars = "!@%&*()_+";
    private final int digitCount = 3;
    private final int lowerCaseCount = 5;
    private final int upperCaseCount = 2;

    private final PasswordGenerator passwordGenerator;

    @Autowired
    public BilternPasswordGenerator(PasswordGenerator passwordGenerator) {
        this.passwordGenerator = passwordGenerator;
    }


    public String generateRandomPassword(){


        CharacterRule digitRule = new CharacterRule(EnglishCharacterData.Digit);
        digitRule.setNumberOfCharacters(digitCount);
        CharacterRule lowercaseLetterRule = new CharacterRule(EnglishCharacterData.LowerCase);
        lowercaseLetterRule.setNumberOfCharacters(lowerCaseCount);
        CharacterRule upperCaseLetterRule = new CharacterRule(EnglishCharacterData.UpperCase);
        upperCaseLetterRule.setNumberOfCharacters(upperCaseCount);
        CharacterRule specialCharacterRule = new CharacterRule(
                new CharacterData() {
                    public String getErrorCode() {
                        return ERROR_CODE;
                    }

                    public String getCharacters() {
                        return "!@#$%^&*()_+";
                    }
                }
        );
        specialCharacterRule.setNumberOfCharacters(specialCharCount);

        return passwordGenerator.generatePassword(11,
                specialCharacterRule,
                lowercaseLetterRule,
                upperCaseLetterRule,
                digitRule);
    }


}
