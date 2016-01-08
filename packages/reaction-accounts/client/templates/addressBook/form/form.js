Template.addressBookForm.helpers({

  /*
   * TODO: update for i18n
   */
  countryOptions: function () {
    const countries = ReactionCore.Collections.Shops.findOne().locales.countries;
    const countryOptions = [];
    for (let locale in countries) {
      if ({}.hasOwnProperty.call(countries, locale)) {
        let country = countries[locale];
        countryOptions.push({
          label: country.name,
          value: locale
        });
      }
    }
    countryOptions.sort(function (a, b) {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
    return countryOptions;
  },
  statesForCountry: function() {
    var locale, options, ref, selectedCountry, shop, state;
    shop = ReactionCore.Collections.Shops.findOne();
    selectedCountry = Session.get('addressBookCountry' || AutoForm.getFieldValue('country'));
    if (!selectedCountry) {
      return false;
    }
    if ((shop != null ? shop.locales.countries[selectedCountry].states : void 0) == null) {
      return false;
    }
    options = [];
    ref = shop != null ? shop.locales.countries[selectedCountry].states : void 0;
    for (state in ref) {
      locale = ref[state];
      options.push({
        'label': locale.name,
        'value': state
      });
    }
    return options;
  },

  /*
   *  Defaults billing/shipping when 1st new address.
   */
  isBillingDefault: function () {
    return typeof this.address === "object" ? this.address.isBillingDefault : true;
  },
  isShippingDefault: function () {
    return typeof this.address === "object" ? this.address.isShippingDefault : true;
  },
  hasAddressBookEntries: function () {
    let account = ReactionCore.Collections.Accounts.findOne({
      userId: Meteor.userId()
    });
    if (account) {
      if (account.profile) {
        if (account.profile.addressBook) {
          return account.profile.addressBook.length > 0;
        }
      }
    }

    return false;
  }
});

Template.addressBookForm.events({
  'change [name="country"]': function() {
    return Session.set('addressBookCountry', AutoForm.getFieldValue('country'));
  }
});
